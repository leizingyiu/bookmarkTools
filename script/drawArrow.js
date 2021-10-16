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

function drawArrowPath(fillColor, classList) {

    var winW = document.getElementsByTagName("html")[0].clientWidth;
    var winH = document.getElementsByTagName("html")[0].clientHeight;

    var bodyRect = document.body.getBoundingClientRect();
    var bodyX = bodyRect.x;
    var bodyY = bodyRect.y;

    var scrollY = document.getElementById('detail').scrollTop;

    var btnRect = document.querySelector('#bookmarkBtn').getBoundingClientRect();
    var btnMidX = btnRect.left + btnRect.width / 2;
    var btnMidY = btnRect.bottom - btnRect.height / 2;


    var m = [btnMidX, btnMidY];
    var l1 = [btnMidX, btnMidY];
    var q = [btnMidX + (winW - btnMidX + bodyX) / 3 + scrollY / 1.5, btnMidY * 0.8,
        btnMidX, 10]


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

    console.log(m, l1, q);

    var d = ('M ' + m.join(' ') + " L " + l1.join(' ') + ' Q ' + q.join(' ') + ' l ' + p1 + ' l ' + p2 + 'L ' + [q[2], q[3]]);

    console.log(d);
    // var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    var path = document.getElementById('arrow');
    path.setAttribute('d', d);
    classList.map(c => path.classList.add(c));

    path.setAttribute('fill', 'transparent');
    path.setAttribute('stroke', fillColor);
    path.setAttribute('stroke-width', Math.sin(strokeWidthIndex++ / Math.PI) * strokeWidth + strokeWidth * 2);

    document.getElementsByTagName('svg')[0].setAttribute('viewBox', '0 0 ' + winW + ' ' + winH);
}

function refleshPath() {
    drawArrowPath('hsla(' + (hOfHsl++ % 360) + ',' + sOfHsl + ',' + lOfHsl + ',1)', ['hue']);
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