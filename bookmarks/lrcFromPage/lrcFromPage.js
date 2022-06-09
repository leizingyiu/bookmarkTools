javascript: (function () {
    console.log(`
    by leizingyiu
    Last modified : "2022/04/14 04:48:20"
    `);
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

    let lrc = [...document.querySelectorAll('.listlyric p')].map(p => {
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

    lrc = `[ti : ${ti} ] \n 
[ar : ${ar} ] \n 
${lrc}`;

    copyStr(lrc);

})();





console.log(`
by leizingyiu
Last modified : "2021/12/14 21:41:53"
`);
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

function downloadLrc() {
    console.log('start download lrc');

    let lrc = [...document.querySelectorAll('.listlyric p')].map(p => {
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

    lrc = `[ti : ${ti} ] \n 
    [ar : ${ar} ] \n 
    ${lrc}`;

    let songName = document.querySelector('.lytit').innerText;
    console.log(lrc, songName);
    save(lrc, songName + '.lrc');
}
//copyStr(lrc);

function save(data, fileName) {
    //https://parallelcodes.com/javascript-create-and-download-text-file/
    // var data = document.getElementById("txtData").value;
    var c = document.createElement("a");
    c.download = fileName;

    var t = new Blob([data], {
        type: "text/plain"
    });
    c.href = window.URL.createObjectURL(t);
    c.click();
}
function generateDownloadA() {
    setTimeout(_ => {
        let lrcTitle = document.querySelector('.lytit');
        console.log(lrcTitle);
        if (lrcTitle) {
            let a = document.createElement('a');
            let id = String(Math.random()).replace(/\./g, '');
            a.id = id;
            a.innerText = '    ';
            a.onclick = downloadLrc;
            a.style.padding = '1em';
            lrcTitle.appendChild(a);
            let style = document.createElement('style');
            style.innerText = `#/3${a.id}:after{ content: '下载lrc';}`;
            document.body.appendChild(style);
        }
    }, 1000);
}

document.querySelector('a[data-action="panel"]').addEventListener('click', generateDownloadA);
