function vAdd() {
    let arg = [...arguments];
    if (arg.length > 2) {
        let v = arg.pop();
        let V = vAdd(...arg);
        return [V[0] + v[0], V[1] + v[1]];
    } else {
        return [arg[0][0] + arg[1][0], arg[0][1] + arg[1][1]];
    }
}

function drawArrowPath(fromDomSelector, fillColor, classList) {

    var winW = document.getElementsByTagName("html")[0].clientWidth;
    var winH = document.getElementsByTagName("html")[0].clientHeight;

    var bodyRect = document.body.getBoundingClientRect();
    var bodyX = bodyRect.x;
    var bodyY = bodyRect.y;
    var scrollY = document.getElementById('detail').scrollTop;

    var btnRect = document.querySelector(fromDomSelector).getBoundingClientRect();
    var btnMidX = btnRect.left + btnRect.width / 2;
    var btnMidY = btnRect.bottom - btnRect.height / 2;


    var m = [btnMidX, btnMidY];
    var l1 = [btnMidX, btnMidY];
    var q = [btnMidX + (winW - btnMidX + bodyX) / 3 + scrollY / 1.5, btnMidY * 0.8,
        btnMidX, btnRect.height / 2 + 10]


    var L = [q[0] - q[2], q[1] - q[3]].map(i => i / 12);

    function rotate(a, v) {

        var x = v[0], y = v[1];

        var sin = Math.sin(Math.PI * a / 180);
        var cos = Math.cos(Math.PI * a / 180);
        var newX = x * cos + y * sin;
        var newY = x * (0 - sin) + y * cos;

        return [newX, newY];
    }

    var p1 = rotate(30, L);
    var p2 = rotate(-90, L);

    //console.log(m, l1, q);

    var d = ('M ' + m.join(' ') + " L " + l1.join(' ') + ' Q ' + q.join(' ') + ' l ' + p1 + ' l ' + p2 + 'L ' + [q[2], q[3]]);

    // console.log(d);
    // var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    var path = document.getElementById('arrow');
    path.setAttribute('d', d);
    classList.map(c => path.classList.add(c));

    path.setAttribute('fill', 'transparent');
    path.setAttribute('stroke', fillColor);
    path.setAttribute('stroke-width', Math.sin(strokeWidthIndex++ / Math.PI) * strokeWidth + strokeWidth * 2);

    // document.querySelector('html').style.cssText = `--border-color: ${fillColor} ;`;
    setDomCssText('html', `--border-color: ${fillColor} ;`);

    document.getElementsByTagName('svg')[0].setAttribute('viewBox', '0 0 ' + winW + ' ' + winH);


    /** setting btn animate */
    let P1 = [0, 0];
    let P2 = [q[0] - l1[0], q[1] - l1[1]];
    let P3 = [q[2] - l1[0], q[3] - l1[1]];
    let moRootName = 'moPoint';
    setDomCssText('html',
        `--${moRootName}-P1:${P1};  --${moRootName}-P2:${P2};  --${moRootName}-P3:${P3};
        --demo-mo-x:${moRootName}x; --demo-mo-y:${moRootName}y;--demo-mo-opacity:${moRootName}opacity;`);

    // setStyleDom('moveBtn', `    
    // @keyframes ${moRootName}x{
    // 0%  {transform:translateX(${P1[0]}px)}
    // 50% {transform:translateX(${P2[0]}px)}
    // 100%{transform:translateX(${P3[0]}px)}
    // }
    // @keyframes ${moRootName}y{
    //     0%  {transform:translateY(${P1[1]}px)}
    //     64%{transform:translateY(${P3[1]}px)}
    //     100%{transform:translateY(${P3[1]}px)}
    //     }
    // `);

    setStyleDom('moveBtn', `    
    @keyframes ${moRootName}x{
    0%  {margin-left:${P1[0]}px;}
    16% {margin-left:${P2[0] / 2 + btnRect.width / 2}px;}
    64%{margin-left:${P3[0] + btnRect.width / 2}px;}
    100%{margin-left:${P3[0] + btnRect.width / 2}px;}
    }
    @keyframes ${moRootName}y{
        0%  {transform:translateY(${P1[1]}px)}
        64%{transform:translateY(${P3[1] - btnRect.height / 2}px)}
        100%{transform:translateY(${P3[1] - btnRect.height / 2}px)}
    }

    @keyframes ${moRootName}opacity{
        0%  {opacity:0}
        24%{opacity:0.8}
        90%{opacity:0.8}
        100%{opacity:0}
    }
    `);


}

function setDomCssText(domSelector = 'html', cssText) {
    console.log(cssText);

    let txtArr = cssText.split(';');
    txtArr.map(txt => {
        //console.log(txt);
        if (txt == undefined || txt == '') { return };
        let t = txt.split(':');
        let name = t[0], value = t[1];
        let dom = document.querySelector(domSelector);
        // console.log(name, value);
        if (dom.style.cssText.indexOf(name) != -1) {
            dom.style.cssText = dom.style.cssText.replace(RegExp(`(?:${name}:)[^;]*;`, 'i'), `${name}:${value};`);
        } else {
            dom.style.cssText += `${name}:${value};`;
        };
    })
}

function refleshPath() {
    drawArrowPath('#bookmarkBtn', 'hsla(' + ((hOfHsl++ % 100) / 100 * 360) + ',' + sOfHsl + ',' + lOfHsl + ',1)', ['hue']);
};


hOfHsl = Math.floor(360 * Math.random());
strokeWidthIndex = 1;
strokeWidth = 1;
sOfHsl = '100%';
lOfHsl = '50%';


window.onresize = function () {
    refleshPath();
};
document.getElementById('detail').onscroll = function () {
    refleshPath();
};

var observer = new MutationObserver(mutations => {
    refleshPath();
});

observer.observe(document.querySelector('main'), {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true,
});