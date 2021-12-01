data:text/html, <html>
<head>
    <meta charset="utf-8">
    <script>
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
                    var resultBoo = window.confirm(str + '   <=内容已复制到剪贴板');
            }
            return resultBoo;
        };
        function copyNext() {
            let pre = document.querySelector('pre');
            let txt = pre.innerText;
            if (!txt.match(/\S/)) {
                alert('请先填入文本');
                pre.innerText = '在这里粘贴文本\n用回车来分批复制\n首先复制第一行\n然后第一行会消失\n';
                return void 0;
            }
            let tArr = txt.split('\n');
            let r = tArr.shift();
            copyStr(r);
            pre.innerText = tArr.filter(Boolean).join('\n');
            console.log('by leizingyiu');
        }
        document.onkeydown = function (e) {
            console.log(e);
            var keyCode = e.keyCode || e.which || e.charCode;
            var ctrlKey = e.ctrlKey || e.metaKey;
            if (e.altKey && keyCode == 67) {
                copyNext();
                e.preventDefault();
                return false;
            }

        }
    </script>
</head>

<body style="display: flex;flex-direction: column;align-content: space-between;height: 100%;margin: 0;">
    <pre contenteditable=""
        style="margin: auto 0;flex-grow: 1;flex-shrink: 0;white-space: pre-wrap;overflow-y: scroll;padding: 1em;line-height: 2em;">
在这里粘贴文本<br>
用回车来分批复制<br>
首先复制第一行<br>
然后第一行会消失
快捷键是 alt + c <br>
</pre>
    <button style="    padding: 2em;    margin: 2em;" onclick='copyNext()'>copyNext!</button>
</body>
</html>