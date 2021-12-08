function copyStr(str) {
    var a = document.createElement('textarea');
    a.value = str;
    document.body.appendChild(a);
    a.select();
    document.execCommand('Copy');
    a.style.display = 'none';
    a.parentElement.removeChild(a);
    switch (true) {
        case Boolean(str.match(/http.*/g)):
            var resultBoo = window.confirm(str + '内容已复制到剪贴板,是否前往内容？');
            if (resultBoo == true) {
                urlReg = /[htpHTPsS]+:\/\/\S+/g;
                location.href = str.match(urlReg) ? str.match(urlReg)[0] : 'javascript:void 0;';
            };
            break;
        default:
            var resultBoo = window.confirm('内容已复制到剪贴板⬇️\n\n' + str);
    }
    return resultBoo;
};

let lrc = [...document.querySelectorAll('#auto-id-1Giw5tWMw11hoqge p')].map(p => {
    let t = p.getAttribute('data-time');
    let m = Math.floor(t / 60);
    let s = (t % 60).toFixed(2);
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    t = m + ':' + s;
    return `[${t}]${p.innerText}`;
}).join('\n');

let ti = document.querySelector('.play .words .fc1').innerText;
let ar = document.querySelector('.play .words .by').innerText;

lrc = `[ti]${ti}
[ar]${ar}
${lrc}`;

copyStr(lrc);