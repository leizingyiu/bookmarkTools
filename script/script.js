/**
Last modified: "2021/10/29 15:23:05"
 */
// console.log('main script');
//console.warn = () => { };

function getQueryJson() {
    /** https://www.cnblogs.com/wangshucheng/p/11203097.html */
    let url = location.href;
    let param = {};
    url.replace(/([^?&]+)=([^?&]+)/g, function (s, v, k) {
        param[v] = decodeURIComponent(k);
        return k + '=' + v;
    });
    return param;
};

function jsonToSearch(json) {
    return JSON.stringify(json).replace(/(^\{)|(\}$)/g, '').replace(/['"]/g, '').replace(/:/g, '=').replace(/,/g, '&');
};
const rootPath = (location.origin + location.pathname).replace(/\/[^/]*$/g, '/');
var searchJson = getQueryJson();
var lang = Object.keys(searchJson).indexOf('lang') != -1 ? searchJson.lang : 'cn';
console.log(lang);




main();

function main() {
    let indexContent = {
        'btn': {
            "cn": "书签工具  （点我随机跳一个书签",
            "en": "bookmark tools   （Click me to jump to a bookmark randomly"
        },
        "dd": {
            "cn": "或者拖去书签栏试试？",
            "en": "or try to drag that to the bookmark bar ?"
        },
        "article": {
            "cn": `<p style="font-weight:300;">
            记录收藏一些，平时自己写的，或者收集回来的，书签工具 <br><br>
            点击按钮可访问源码
            </p>`,
            "en": `<p style="font-weight:300;">
            Collect some records, usually write by yourself, or collect back, bookmark tool <br><br>
            Click the button to access the source code
            </p>`
        }
    };
    if (Object.keys(searchJson).indexOf('bookmark') != -1) {
        console.log(searchJson, Object.keys(searchJson).indexOf('bookmark'));

        let bookmark = searchJson.bookmark;
        fetch(rootPath + '\\items.json')
            .then(r => r.json())
            .then(json => {
                keys = Object.keys(json);
                if (keys.indexOf(bookmark) != -1) {
                    loadDetail(json[bookmark]);
                    // loadBtn(json[bookmark].scriptPath);
                    // loadMd(json[bookmark].mdpath[lang]);
                    // setUrl('bookmark', bookmark);
                    // document.querySelector('#bookmarkBtn').innerText = json[bookmark].showName[lang];
                    // document.querySelector("#bookmarkContainer dd").innerText = json[bookmark].describe[lang];
                }
            })
    } else {
        clickAndDrag(document.getElementById('bookmarkBtn'), window.location, `javascript:
        fetch(rootPath + '\\items.json')
        .then(r=>r.json())
        .then(j=>{
            let keys=Object.keys(j);
            let k=keys[Math.floor(Math.random()*keys.length)];
            console.log(j,k);
            console.log(j[k]);
            loadDetail(j[k]); 
        })
        `);
        /* loadBtn(j[k].scriptPath);
            loadMd(j[k].mdpath[lang]);
            setUrl('bookmark',k);
            document.querySelector('#bookmarkBtn').innerText = j[k].showName[lang];
            document.querySelector("#bookmarkContainer dd").innerText = j[k].describe[lang];
            */
        document.querySelector('#bookmarkBtn').innerHTML = indexContent.btn[lang];
        document.querySelector('#bookmarkContainer dd').innerHTML = indexContent.dd[lang];
        document.querySelector('#detail article').innerHTML = indexContent.article[lang];
    }
    loadMenu();

    return void 0;
}


function setUrl(name, value) {
    let searchJ = getQueryJson();
    searchJ[name] = value;
    let url = location.pathname + '?' + jsonToSearch(searchJ);
    history.pushState({
        url: url,
        title: document.title
    }, document.title, url);
    return void 0;
}

function loadDetail(json) {
    console.log(json);
    setUrl('bookmark', json['name']);

    let showName = Object.keys(json['showName'])[0] != '0' ? json['showName'][lang] : json['showName'];
    document.querySelector('#bookmarkBtn').innerText = showName;

    let describe = Object.keys(json['describe'])[0] != '0' ? json['describe'][lang] : json['describe'];

    document.querySelector("#bookmarkContainer dd").innerText = describe;
    if (json.hasOwnProperty('minPath')) {
        loadBtn(json['minPath'], json['scriptPath']);
    } else {
        loadBtn(json['scriptPath']);
    }

    let mdPath = Object.keys(json['mdPath'])[0] != '0' ? json['mdPath'][lang] : json['mdPath'];
    loadMd(mdPath);

    if (json.hasOwnProperty('pointerCursor') && json['pointerCursor'] == true) {
        document.querySelector('#bookmarkBtn').style.cursor = 'pointer!important';
    } else {
        document.querySelector('#bookmarkBtn').style.cursor = 'move!important';
    }

}

function loadMenu() {
    // console.trace();
    // console.log('load menu');
    const menuText = {
        'selectLang': {
            "cn": "language:",
            "en": '语言:'
        }
    }

    {
        let langList = ['cn', 'en'];
        let li = document.createElement('li');
        let dl = document.createElement('dl');
        let dt = document.createElement('dt');
        let dd = document.createElement('dd');
        let ul = document.createElement('ul');

        li.id = 'header';
        dt.innerHTML = '<a href="javascript:window.location=window.location.origin+window.location.pathname;">Bookmark Tools</a>';
        dd.innerText = 'by leizingyiu';
        document.getElementById('toolsList').appendChild(li);
        li.appendChild(dl);
        dl.appendChild(dt);
        dl.appendChild(dd);
        dd.appendChild(ul);

        let langLi = document.createElement('li');
        langLi.innerText = menuText.selectLang[lang];
        ul.appendChild(langLi);

        langList.map(la => {
            let l = document.createElement('li');
            l.innerText = la;
            l.onclick = function () {
                let searchJ = getQueryJson();
                searchJ.lang = this.innerText;
                window.location = window.location.origin + window.location.pathname + '?' + jsonToSearch(searchJ);
            }
            ul.appendChild(l);
        });
    }

    {
        let footerLi = document.createElement('li');
        let dl = document.createElement('dl');
        let dt = document.createElement('dt');
        let dd = document.createElement('dd');

        footerLi.id = 'footer';
        dt.innerHTML = 'Designed & Powerd by Leizingyiu</br>Copyright© <a href="https://leizingyiu.net" >Leizingyiu.net</a>';
        dd.innerHTML = '粤ICP备2020086793号';
        document.getElementById('toolsList').appendChild(footerLi);
        footerLi.appendChild(dl);
        dl.appendChild(dt);
        dl.appendChild(dd);
    }


    fetch(rootPath + '\\items.json')
        .then(r => r.json())
        .then(json => {
            console.log(json);

            let keys = Object.keys(json);
            for (var k of keys) {
                let li = document.createElement('li');
                let dl = document.createElement('dl');
                let dt = document.createElement('dt');
                let dd = document.createElement('dd');

                dt.innerText = json[k].showName[lang];
                dd.innerText = json[k].describe[lang];

                dl.setAttribute('scriptName', json[k].name);
                dl.setAttribute('scriptShowName', json[k].showName[lang]);
                dl.setAttribute('scriptDescribe', json[k].describe[lang]);

                dl.setAttribute('scriptPath', json[k].scriptPath);
                dl.setAttribute('mdPath', json[k].mdPath[lang])
                if (json[k].hasOwnProperty('pointerCursor') && json[k].pointerCursor == true) {
                    dl.setAttribute('pointerCursor', 'true');
                }
                dl.onclick = function () {
                    var thisJson = {
                        "name": this.getAttribute('scriptName'),
                        "showName": this.getAttribute('scriptShowName'),
                        "describe": this.getAttribute('scriptDescribe'),
                        "scriptPath": this.getAttribute('scriptPath'),
                        "mdPath": this.getAttribute('mdPath'),
                        "pointerCursor": this.hasAttribute('pointerCursor') && this.getAttribute('pointerCursor') == true
                    };

                    loadDetail(thisJson);
                }

                document.getElementById('toolsList').insertBefore(li,
                    document.getElementById('footer'));
                li.appendChild(dl);
                dl.appendChild(dt);
                dl.appendChild(dd);
            }

        });



    return void 0;
}

function loadBtn(minUrl, readUrl = minUrl) {
    fetch(minUrl)
        .then(r => r.text())
        .then(t => {
            let btn = document.getElementById('bookmarkBtn');
            t = t.match(/(^javascript)|(^data)/) ? t : 'javascript:' + t;
            //* console.log(t, '\n', readUrl);*/
            clickAndDrag(btn, t, readUrl);
        });

    return void 0;
}

function loadMd(url) {
    console.log(url);
    fetch(url)
        .then(r => r.text())
        .then(t => {
            let article = document.querySelector('article');
            article.innerHTML = marked(t);
        });

    return void 0;
}

function clickAndDrag(dom, dragUrl, clickUrl) {
    dom.setAttribute('dragUrl', dragUrl);
    dom.setAttribute('clickUrl', clickUrl);
    // console.log(dragUrl, '\n', clickUrl);
    dom.draggable = "true";
    var nonHref = "javascript:void 0;"
    dom.href = nonHref;
    var flag = 0;
    dom.addEventListener("mouseover", function () {
        this.href = this.getAttribute('dragUrl');
    }, false);
    dom.addEventListener("mouseout", function () {
        this.href = nonHref;
    }, false);
    dom.addEventListener("mousedown", function () {
        flag = 0;
    }, false)
    dom.addEventListener("mousemove", function () {
        flag = 1;
    }, false)
    dom.addEventListener("mouseup", function () {
        dom.href = nonHref;
        if (flag === 0) {
            openWin(this.getAttribute('clickUrl'));
        }
    }, false)
}

function openWin(url, tar) {
    if (url.indexOf('javascript:') == 0) {
        console.log(url);
        url = url.replace('javascript:', '');
        eval(url);
        return;
    }
    var a = document.createElement("a");
    console.log(url);
    a.href = url;
    a.target = tar ? tar : "_self";
    a.id = "openWin";
    document.getElementsByTagName('body')[0].append(a);
    document.getElementById("openWin").click();
    document.getElementById('openWin').remove();
}