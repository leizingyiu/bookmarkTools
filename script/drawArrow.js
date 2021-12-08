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

if (window.location.href.indexOf('leizingyiu.net') != -1) {
    console.isDebug = false;
    console.log = () => { };
    console.trace = () => { }
}


hOfHsl = Math.floor(360 * Math.random());
sOfHsl = '100%';
lOfHsl = '50%';
frameTime = 1000 / 120;
strokeWidthIndex = 1;
strokeWidth = 1;
function drawArrowPath(fromDomSelector, fillColor, classList) {


    let winW = document.getElementsByTagName("html")[0].clientWidth;
    let winH = document.getElementsByTagName("html")[0].clientHeight;

    let bodyRect = document.body.getBoundingClientRect();
    let bodyX = bodyRect.x;
    let bodyY = bodyRect.y;
    let scrollY = document.getElementById('detail').scrollTop;

    let btnRect = document.querySelector(fromDomSelector).getBoundingClientRect();
    let btnMidX = btnRect.left + btnRect.width / 2;
    let btnMidY = btnRect.bottom - btnRect.height / 2;


    let m = [btnMidX, btnMidY];
    let l1 = [btnMidX, btnMidY];
    let q = [btnMidX + (winW - btnMidX + bodyX) / 3 + scrollY / 1.5, btnMidY * 0.8,
        btnMidX, btnRect.height / 2]


    let L = [q[0] - q[2], q[1] - q[3]].map(i => i / 12);

    function rotate(a, v) {

        let x = v[0], y = v[1];

        let sin = Math.sin(Math.PI * a / 180);
        let cos = Math.cos(Math.PI * a / 180);
        let newX = x * cos + y * sin;
        let newY = x * (0 - sin) + y * cos;

        return [newX, newY];
    }

    let p1 = rotate(30, L);
    let p2 = rotate(-90, L);

    //console.log(m, l1, q);

    let d = ('M ' + m.join(' ') + " L " + l1.join(' ') + ' Q ' + q.join(' ') + ' l ' + p1 + ' l ' + p2 + 'L ' + [q[2], q[3]]);

    // console.log(d);
    // var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let path = document.getElementById('arrow');
    // var animation = document.getElementById('arrowAnimation');
    // if (animation.getAttribute('to') != '') {
    //     path.setAttribute('d', animation.getAttribute('to'));
    //     animation.setAttribute('dur', `${frameTime}s`);
    // }
    // if (path.getTotalLength() != 0) {
    //     animation.setAttribute('to', d);
    // } else {
    //     path.setAttribute('d', d);
    // }
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
    let ramNum = String(Math.floor(Math.random() * 10000));
    setDomCssText('html',
        `--${moRootName}-P1:${P1};  --${moRootName}-P2:${P2};  --${moRootName}-P3:${P3};
        --btn-left:${btnRect.left}px; --btn-top:${btnRect.top}px;
        --demo-mo-x:${moRootName}x-${ramNum};--demo-mo-margin-x:${moRootName}x-margin-${ramNum}; --demo-mo-y:${moRootName}y-${ramNum};--demo-mo-opacity:${moRootName}opacity-${ramNum};`);

    let moveY = P3[1]; // + btnRect.height / 3;
    console.log(moveY);

    setStyleDom('moveBtn', `
    @keyframes ${moRootName}x-margin-${ramNum}{
    0%  {margin-left:${P1[0]}px;}
    16% {margin-left:${P2[0] / 2}px;}
    64%{margin-left:${P3[0]}px;}
    100%{margin-left:${P3[0]}px;}
    }
    @keyframes ${moRootName}x-${ramNum}{
        0%  {margin-left:${P1[0]}px;}
        16% {margin-left:${P2[0] / 2}px;}
        64%{margin-left:${P3[0]}px;}
        100%{margin-left:${P3[0]}px;}
        }
    @keyframes ${moRootName}y-${ramNum}{
        0%  {transform:translateY(${P1[1]}px );}
        64%{transform:translateY(${moveY}px );}
        100%{transform:translateY(${moveY}px );}
    }

    @keyframes ${moRootName}opacity-${ramNum}{
        0%  {opacity:0}
        24%{opacity:0.8}
        80%{opacity:0.8}
        100%{opacity:0}
    }

  
    `);

    /**
       #detail #bookmarkBtn:after {
            -webkit-animation: var(--demo-mo-margin-x) 3s ease infinite, var(--demo-mo-y) 3s infinite, var(--demo-mo-opacity) 3s infinite;
                    animation: var(--demo-mo-margin-x) 3s ease infinite, var(--demo-mo-y) 3s infinite, var(--demo-mo-opacity) 3s infinite;
            -webkit-animation-play-state: running;
                    animation-play-state: running;}
                     */
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
    console.log('refleshPath', Date.now());
    drawArrowPath('#bookmarkBtn', 'hsla(' + ((hOfHsl++ % 100) / 100 * 360) + ',' + sOfHsl + ',' + lOfHsl + ',1)', ['hue']);
};

// var refleshingPath = throttle(refleshPath, 1000 / 120);
var refleshingPath = refleshPath;


window.addEventListener('load', function winLoadPath() {
    refleshingPath();
});
window.addEventListener('resize', function winResizePath() {
    refleshingPath();
});

document.querySelector('.v-page').addEventListener('scroll', function detailScrollPath(e) {
    detailScrollTop = e.target.scrollTop;
    if (typeof lastDetailScrollTop != 'undefined' && Math.abs(lastDetailScrollTop - detailScrollTop) >= 1) {
        refleshingPath();
    }
    lastDetailScrollTop = detailScrollTop;
});

if (typeof refleshingPathObserverBoo == 'undefined') {
    var observer = new MutationObserver(mutations => {

        refleshingPathObserverBoo = true;
        refleshingPath();
    });

    observer.observe(document.getElementById('detail'), {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
    });
}

