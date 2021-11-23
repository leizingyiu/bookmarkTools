javascript: (function () {
    console.log(`
    by leizingyiu
    Last modified : "2021/11/23 13:16:11"
    `);
    list = [];
    let numDiv = document.createElement("p");
    numDiv.style.cssText = `position:fixed;left:15px;bottom:10px;z-index:999999;padding:1em;background:rgba(102, 102, 102,0.8);text-align:center;color:#fff;    `;
    document.getElementsByTagName("html")[0].appendChild(numDiv);

    function addToList(selector = 'img', attribute = 'src') {
        let newImgArray = [...document.querySelectorAll(selector)].map(d => d.hasAttribute(attribute) ? d.getAttribute(attribute) : false).filter(Boolean);
        list = list.concat(newImgArray);
        list = [...new Set(list)];
        numDiv.innerText = '已经获取 ' + Object.getOwnPropertyNames(list).length + " 张图片,按enter提取";
        console.log(numDiv.innerText);
    };

    function observerFun() {
        addToList();
    };
    observerFun();
    let targetNode = document.getElementsByTagName('body')[0];
    let config = { attributes: true, childList: true, subtree: true };
    let observer = new MutationObserver(observerFun);
    observer.observe(targetNode, config);

    document.onkeydown = function (event) {
        var e = event || window.e;
        var keyCode = e.keyCode || e.which;
        switch (keyCode) {
            case 13:
                observer.disconnect();
                numDiv.remove();
                console.log(list);
                let resultDom = document.createElement('div');
                document.body.insertBefore(resultDom, document.body.childNodes[0]);
                list.map(i => {
                    let img = document.createElement('img');
                    img.src = i;
                    img.width = 100;
                    resultDom.appendChild(img);
                });
                let p = document.createElement('p');
                p.innerText = '已获取以上图片，请继续使用getImage浏览';
                resultDom.appendChild(p);
                break;
        }
    }
})();
