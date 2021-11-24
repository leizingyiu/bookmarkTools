javascript:
console.log(`
/*  Created: 2021/03/03 21:26:31
    Last modified: "2021/11/23 14:04:02"
    by leizingyiu
    */`);
function getSearchJson() {
    var search;
    if (arguments.length == 0) {
        search = decodeURI(window.location.search);
    } else {
        search = decodeURIComponent(arguments[0]).split('?')[1];
    }
    let param = {};
    search.replace(/([^?&]+)=([^?&]+)/g, function (s, v, k) {
        param[v] = unescape(k);
        return k + '=' + v;
    });
    return param;
};
var search = getSearchJson();

function passphraseReading() {
    /*    var tklReader2 = "http://api-test.shihuizhu.com/tool/revertTkc?tkl=";*/
    var tklLogin = `https://taodaxiang.com/common/e/d?t=`;
    var tklReader = 'https://taodaxiang.com/taopass/parse/get?content=';
    /*var klReg = /(?<=[^a-zA-Z0-9])[a-zA-Z0-9]{11}(?=[^a-zA-Z0-9])/g;*/
    var goto = '';
    var koulin = '';
    var defaultRead = function () {
        switch (true) {
            case window.location.href.indexOf(tklLogin) != -1:
                koulin = search.content;
                goto = tklReader + koulin;
                break;
            default:
                try {
                    koulin = document.querySelector("#koulin,#foo0,#tkl0,#taokey").innerText;
                } catch (err) {
                    koulin = window.prompt("请粘贴文本", "defaultText");
                    if (koulin == null) {
                        return null;
                    }
                    /*           koulin = '￥' + koulin + "￥";*/
                    koulin = encodeURIComponent(koulin.replace(/ /g, '+'));
                };
                let t = new Date();
                goto = tklLogin + t.getTime() + '&content=' + koulin;
        }

    };

    switch (window.location.hostname) {
        case 'm.weibo.cn':
            let subSearch = search.scheme.split('?');
            subSearch.shift();
            let temp;
            do {
                temp = subSearch.toString();
                subSearch = decodeURIComponent(subSearch);
            } while (subSearch.toString() != temp)
            goto = subSearch.toString().match(/(?<=h5Url=)[^&]+/g);
            if (goto == null) {
                defaultRead();
            }
            break;
        case 'weibo.com':
            try {
                koulin = document.querySelector('#plc_main .WB_frame_c').innerText.match(klReg);
            } catch (err) {
                defaultRead();
                break;
            }
            if (koulin == null) {
                defaultRead();
            } else {
                goto = encodeURI(tklReader + '￥' + koulin + "￥");
            }
            break;
        case 'taodaxiang.com':
            switch (true) {
                case window.location.href.indexOf('common') != -1:
                    defaultRead();
                    break;
                default:
                    if (document.body.innerText.indexOf('"code":0') != -1) {
                        pre = document.querySelector("body").innerText;
                        goto = JSON.parse(pre).data.url;
                    } else {
                        goto = tklReader + search['content'];
                    }
            }

            break;
        /*case 'api-test.shihuizhu.com':
            if (document.body.innerText.indexOf('"code":0') != -1) {
                pre = document.querySelector("pre").innerText;
                goto = JSON.parse(pre).data;
            } else {
                goto = tklReader2 + search['tkl'];
            }
            break;*/
        case "uland.taobao.com":
            goto = document.querySelector('a').href;
            break;
        case "mo.m.tmall.com":
            goto = document.querySelectorAll('a')[1].href;
        default:
            defaultRead();
    }
    return goto;
}
var url = passphraseReading();
url == '' ? (void 0) : console.log(window.location.href = url);