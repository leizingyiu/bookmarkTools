javascript: (function () {
    var numDiv = document.createElement("p");
    numDiv.style.position = "fixed";
    numDiv.style.left = "15px";
    numDiv.style.bottom = "10px";
    numDiv.style.zIndex = "999999999";
    numDiv.style.padding = "1em";
    numDiv.style.background = "rgba(102, 102, 102,0.8)";
    numDiv.style.textAlign = 'center';
    numDiv.style.color = '#fff';
    document.getElementsByTagName("html")[0].appendChild(numDiv);

    function addToList(domName, callback) {
        return function () {
            if ("undefined" == typeof list) { list = {}; }

            [...document.querySelectorAll('video')].map(v => v.parentNode.innerHTML.match(/<video.*<\/video>/g).map(function (V) {
                let vId = V.match(/(?<=src=['"])[^'"]*(?=['"])/g).join('');
                list[vId] = document.createElement('div');
                list[vId].innerHTML = V;
            }));
            callback();
        }
    }
    addToList('video', function () {
        numDiv.innerText = '已经获取 ' + Object.keys(list).length + " 张图片,按enter提取";
    })
    var targetNode = document.getElementsByTagName('body')[0];
    var config = {
        attributes: true,
        childList: true,
        subtree: true
    };
    var observer = new MutationObserver(addToList('video', function () {
        numDiv.innerText = '已经获取 ' + Object.keys(list).length + " 张图片,按enter提取";
    }));
    observer.observe(targetNode, config);

    document.onkeydown = function (event) {
        var e = event || window.e;
        var keyCode = e.keyCode || e.which;
        switch (keyCode) {
            case 13:
                observer.disconnect();
                numDiv.remove();
                document.querySelector('body').innerHTML = '';
                Object.keys(list).map(function (k) {
                    document.querySelector('body').appendChild(list[k]);
                })
                break;
        }
    }


})()