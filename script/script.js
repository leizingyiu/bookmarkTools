
var LastModified = "2021/12/08 20:49:36"
    ;
// console.log('main script');
//console.warn = () => { };

if (window.location.href.indexOf('leizingyiu.net') != -1) {
    console.isDebug = false;
    console.log = () => { };
    console.trace = () => { }
}

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
    console.log('main start');
    let indexContent = {
        'btn': {
            "cn": "书签工具<br><small style='font-size:0.6em;line-height:1.2em'>（拖我去书签栏</small><br><small style='font-size:0.6em;line-height:1.2em;cursor:pointer;'>（或者点我随机跳一个书签</small>",
            "en": "bookmark tools<br><small style='font-size:0.5em;line-height:1.2em'>(Drag me to the bookmarks bar</small><br><small style='font-size:0.5em;line-height:1.2em;cursor:pointer;'>(Or click me to jump to a bookmark randomly</small>"
        },
        "dd": {
            "cn": "获取图片、放大淘宝选项、解锁选中限制……不驻留后台不占用内存！",
            "en": "Get pictures, zoom in on Taobao options, unlock selected restrictions... Do not stay in the background and do not take up memory!?"
        },
        "article": {
            "cn": `<p style="font-weight:300;">记录收藏一些，平时自己写的，或者收集回来的，书签工具 <br>
            <br>点击按钮可访问源码
            </p>`,
            "en": `<p style="font-weight:300;">
            Collect some records, usually write by yourself, or collect back, bookmark tool <br><br>
            Click the button to access the source code
            </p>`
        }
    };
    if (Object.keys(searchJson).indexOf('bookmark') != -1 && searchJson.bookmark == 'random') {
        fetch(rootPath + '\\items.json')
            .then(r => r.json())
            .then(j => {
                let keys = Object.keys(j);
                let k = keys[Math.floor(Math.random() * keys.length)];
                console.log(j, k);
                console.log(j[k]);
                goUrl('bookmark', k);
            })

    } else if (Object.keys(searchJson).indexOf('bookmark') != -1) {
        console.log(searchJson, Object.keys(searchJson).indexOf('bookmark'));

        let bookmark = searchJson.bookmark;
        fetch(rootPath + '\\items.json')
            .then(r => r.json())
            .then(json => {
                keys = Object.keys(json);
                if (keys.indexOf(bookmark) != -1) {
                    loadDetail(json[bookmark]);
                }
            })
    } else {
        document.querySelector('#bookmarkBtn').innerHTML = indexContent.btn[lang];
        document.querySelector('#bookmarkBtn').href = rootPath + '?bookmark=random';
        document.querySelector('#bookmarkBtn').setAttribute('showName', indexContent.btn[lang])
        document.querySelector('#bookmarkContainer dd').innerHTML = indexContent.dd[lang];
        document.querySelector('#detail article').innerHTML = indexContent.article[lang];
    }
    loadMenu();
    console.log('begin load demo');
    loadDemoBookmarkList();
    console.log('end load demo');
    addDemoBtn();


    let u = navigator.userAgent;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端



    if (isiOS) {
        document.body.classList.add('ios');
    }
    if (isAndroid) {
        document.body.classList.add('android');
    }

    console.log('main end');

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
function goUrl(name, value) {
    let searchJ = getQueryJson();
    searchJ[name] = value;
    let url = location.pathname + '?' + jsonToSearch(searchJ);
    window.location = url;
    return void 0;
}

function loadDetail(json) {
    console.log('loadDetail start');
    setUrl('bookmark', json['name']);

    let showName = Object.keys(json['showName'])[0] != '0' ? json['showName'][lang] : json['showName'];
    document.querySelector('#bookmarkBtn').innerText = showName;
    document.querySelector('#bookmarkBtn').setAttribute('showName', showName);
    setStyleDom('demoBtnTxt', `:root{--demo-btn-txt:'${showName}';}`);


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

    console.log('loadDetail end');

}

function loadMenu() {
    console.trace();

    // console.trace();
    // console.log('load menu');
    const menuText = {
        'selectLang': {
            "cn": "language:",
            "en": '语言:'
        }
    }

    {/** load  header */
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

    {     /** load items */
        fetch(rootPath + '\\items.json')
            .then(r => r.json())
            .then(json => {
                console.log(json);

                let keys = Object.keys(json);
                for (var k of keys) {
                    if (k == 'LastModified') {
                        continue;
                    }
                    let li = document.createElement('li');
                    let dl = document.createElement('dl');
                    let dt = document.createElement('dt');
                    let dd = document.createElement('dd');
                    try {
                        dt.innerText = json[k].showName[lang];
                        dd.innerText = json[k].describe[lang];
                    } catch (err) {
                        console.log(err);
                        continue;
                    }
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
                        [...document.querySelectorAll('.now')].map(i => {
                            i.classList.remove('now');
                        });
                        this.classList.add('now');
                        this.parentNode.classList.add('now');

                        loadDetail(thisJson);
                    }

                    document.getElementById('toolsList').insertBefore(li,
                        document.getElementById('footer'));
                    li.appendChild(dl);
                    dl.appendChild(dt);
                    dl.appendChild(dd);
                }


                if (Object.keys(searchJson).indexOf('bookmark') != -1 && document.querySelector(`[scriptname=${searchJson.bookmark}]`) != null) {
                    let dom = document.querySelector(`[scriptname=${searchJson.bookmark}]`)
                    dom.classList.add('now');
                    dom.parentNode.classList.add('now');
                } else {
                    document.querySelector(`#header`).classList.add('now');
                };


            });
    }






    console.log(LastModified);


    {/** load footer  */

        fetch(rootPath + '\\items.json')
            .then(r => r.json())
            .then(json => {
                console.log(json);
                let keys = Object.keys(json);
                for (var k of keys) {
                    if (k == 'LastModified') {
                        LastModified = json['LastModified'];

                        let footerLi = document.createElement('li');
                        let dl = document.createElement('dl');
                        let dt = document.createElement('dt');
                        let dd = document.createElement('dd');

                        footerLi.id = 'footer';
                        dt.innerHTML = `Designed & Powerd by Leizingyiu</br>
                        Copyright© <a href="https://leizingyiu.net" >Leizingyiu.net</a></br>
                        Last Update: ${LastModified}`;
                        dd.innerHTML = '粤ICP备2020086793号';
                        document.getElementById('toolsList').appendChild(footerLi);
                        footerLi.appendChild(dl);
                        dl.appendChild(dt);
                        dl.appendChild(dd);


                    }
                }
            });
    }






    return void 0;
}

function loadDemoBookmarkList() {
    console.trace();
    var bookmarkNames = '';

    var demoBtnTxt = { "cn": "书签工具", "en": "bookmark script" }[lang];

    let demoTitle = { 'cn': '你的书签栏 | ', 'en': "your bookmarks | " };
    fetch(rootPath + '\\items.json')
        .then(r => r.json())
        .then(json => {
            console.log(json + '_______________________________');

            let keys = Object.keys(json);
            for (var k of keys) {
                if (json[k].hasOwnProperty('showName') == false) {
                    continue;
                }
                bookmarkNames += ' 🌏' + json[k].showName[lang]
            }
            bookmarkNames = demoTitle[lang] + bookmarkNames;
            // setDomCssText('html', ``);

            if (Object.keys(searchJson).indexOf('bookmark') != -1) {
                let bookmark = searchJson.bookmark;
                if (keys.indexOf(bookmark) != -1) {
                    demoBtnTxt = json[bookmark].showName[lang];
                }
            };

            console.log('demoContent!!');

            setStyleDom('demoContent', ` :root{
                --demo-content:'${bookmarkNames}';
            }`);
            setStyleDom('demoBtnTxt', `            :root{     --demo-btn-txt:'${demoBtnTxt}';}
            `)
        });

    setStyleDom('demoListStyle', `
                #detail:before{
                    // content:var(--demo-content);
                    position: absolute;
                    top: 0;
                    font-size:1rem;
                    line-height:1rem;
                    padding: 1rem;
                    background: hsla(0deg,100%,100%,0.5);
                    border-bottom:solid 1px #aaa;
                    width: 100%;
                    z-index: -2;
                    opacity: 1;
                    transition: opacity 0.5s ease;
                    letter-spacing:0.05em;
                    font-weight:300;
                    thisCssFrom:loadDemo;
                    word-break: keep-all;
                    white-space: nowrap;
                }
                #detail:after {
                    content:'';
                    display:block;
                    height:calc( 3rem + 2px );
                    width:20vw;
                    position:absolute;
                    top:0;
                    right:0;
                    background: rgb(255,255,255);
                    background: linear-gradient(-90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
                    transition: opacity 0.8s ease 0.3s;

                }
                #detail:hover:before,#detail:hover:after {
                    opacity:0.08;
                    transition: opacity 0.3s ease !important;
                }
                `);

    // setStyleDom('demoBtnStyle', `

    //             #detail #bookmarkBtn:after{
    //             animation: var(--demo-mo-x) 3s ease infinite ,var(--demo-mo-y)  3s infinite  ,var(--demo-mo-opacity) 3s infinite;
    //             animation-play-state:running;

    //             content:var(--demo-btn-txt);
    //             font-size: 1em;
    //             display:block;
    //             position:absolute;
    //             left: 0%;
    //             top: 0%;
    //             width: max-content;
    //             padding: 0.25em;
    //             border: dashed 2px rgba(0, 0, 0, 0.3);
    //             border-radius: 0.25em;
    //             opacity:1;
    //             transition:opacity 0.5s ease;
    //             background: radial-gradient(circle, rgba(255,255,255,1) 0%,rgba(255,255,255,0.64) 50%, rgba(255,255,255,0) 100%);
    //             color:rgba(0,0,0,1);
    //             background-color:rgba(255, 255, 255, 0.8);
    //             border-color:rgba(0, 0, 0, 0.3);
    //             transition:color 0.2s ease, border-color 1s ease ,background-color 1s ease !important;
    //             box-shadow: 0px 4px 12px 0px rgba(0 0 0 / 8%),
    //             0px 8px 32px 0px rgba(0 0 0 / 4%);

    //             z-index:-1;

    //             }
    //             #detail:hover #bookmarkBtn:after{
    //             animation-play-state:paused;
    //             border-color:rgba(0, 0, 0, 0)!important;
    //             background-color:rgba(255, 255, 255, 0)!important;
    //             color:rgba(0,0,0,0);
    //             background-image: radial-gradient(circle, rgba(255, 255, 255,0) 0%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0) 100%);
    //             box-shadow: 0px 0px 12px 0px rgb(0 0 0 / 0%),
    //             0px 0px 32px 0px rgb(0 0 0 / 0%);
    //             }
    //             `);


}
function loadBtn(minUrl, readUrl = minUrl) {
    console.trace();

    fetch(minUrl)
        .then(r => r.text())
        .then(t => {
            let btn = document.getElementById('bookmarkBtn');
            t = t.match(/(^javascript)|(^data)|(^http)/) ? t : 'javascript:' + t;
            //* console.log(t, '\n', readUrl);*/
            clickAndDrag(btn, t, readUrl);
        });


    return void 0;
}

function loadMd(url) {
    console.trace();
    fetch(url)
        .then(r => r.text())
        .then(t => {
            let article = document.querySelector('article');
            article.innerHTML = marked(t);
        });

    return void 0;
}

function clickAndDrag(dom, dragUrl, clickUrl) {
    console.trace();

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
    console.trace();

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



function setStyleDom(id, innerHTML) {
    console.trace();
    console.log([id, innerHTML]);

    if (document.querySelector(`#${id}`) == null) {
        let style = document.createElement('style');
        style.id = id;
        style.innerHTML = innerHTML;
        document.body.appendChild(style);
    } else {
        document.querySelector(`#${id}`).innerHTML = innerHTML;
    }
}
function setDomCssText(domSelector = 'html', cssText) {
    console.trace();

    let txtArr = cssText.split(';');
    txtArr.map(txt => {
        console.log(txt);
        if (txt == undefined || txt == '') { return };
        let t = txt.split(':');
        let name = t[0], value = t[1];
        let dom = document.querySelector(domSelector);
        console.log(name, value);
        if (dom.style.cssText.indexOf(name) != -1) {
            dom.style.cssText = dom.style.cssText.replace(RegExp(`(?:${name}:)[^;]*;`, 'i'), `${name}:${value};`);
        } else {
            dom.style.cssText += `${name}:${value};`;
        };
    })
}

function addDemoBtn() {
    console.trace();

    let demoContainerId = 'demoContainer';
    let demoBtnId = 'demoBtn';
    let demoContainer, demoBtn;
    if (document.querySelector(`#${demoContainerId}`) == null) {

        demoContainer = document.createElement('div');
        demoContainer.id = demoContainerId;

        demoBtn = document.createElement('a');
        demoBtn.id = demoBtnId;

        demoContainer.style.cssText = `
        position:fixed; top:0;  left:0;
        width:100vw;    height:100vh;
        z-index:-99999;
        `;
        document.body.appendChild(demoContainer);
        demoContainer.appendChild(demoBtn);
    } else {
        demoContainer = document.getElementById(demoContainerId);
        demoBtn = document.getElementById(demoBtnId);

        return void 0;
    }


    let target = document.getElementById('bookmarkBtn');


    setStyleDom('newDemoBtnMove', `
    #demoContainer {
        -webkit-animation: var(--demo-mo-x) 3s ease infinite, var(--demo-mo-opacity) 3s infinite;
                animation: var(--demo-mo-x) 3s ease infinite, var(--demo-mo-opacity) 3s infinite;
        -webkit-animation-play-state: running;
                animation-play-state: running;}
    #demoBtn {
        -webkit-animation: var(--demo-mo-y) 3s infinite;
                animation:  var(--demo-mo-y) 3s infinite;
        -webkit-animation-play-state: running;
                animation-play-state: running;
            }
  
    `);

    document.getElementById('detail').addEventListener('mouseenter', function () {
        console.log('mouse enter detail');
        document.querySelector('#demoBtn').style.opacity = 0.2;

    }, true);
    document.getElementById('detail').addEventListener('mouseout', function () {
        console.log('mouse leave detail');

        document.querySelector('#demoBtn').style.opacity = 1;

    }, true);

    demoBtn.setAttribute('style', `
        display:block;
        width: -webkit-max-content;
        width: -moz-max-content;
        width: max-content;
        position: relative;
        left:var(--btn-left);
        top:var(--btn-top);
        border: dashed 2px rgba(0, 0, 0, 0.3);
        font-size: 1.5em;
        font-weight: 300;
        letter-spacing: 0.1em;
        border-radius: 0.25em;
        padding: 0.25em;
        text-align:center;
        cursor: move;
        background-color: rgba(255, 255, 255, 0.8);
        transition: border 0.2s ease, box-shadow 0.2s ease;
    
        box-shadow: 0px 4px 12px 0px rgb(0 0 0 / 8%),
            0px 8px 32px 0px rgb(0 0 0 / 4%);
    
        max-width: 100%;
        box-sizing: border-box;
        transition:opacity 0.5s linear;
        `);
    demoBtn.setAttribute('settingTime', Date.now());
    demoBtn.innerHTML = target.innerHTML;

    if (typeof setDomCssTextActiveBoolean == 'undefined') {
        let observer = new MutationObserver(function setDemoText(mutations) {
            setDomCssTextActiveBoolean = true;
            demoBtn.innerText = target.innerText;
        });

        observer.observe(target, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true,
        });
    }



}

function isIOS() {
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    return isiOS;
}

