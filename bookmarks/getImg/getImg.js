javascript: console.log(`获取图片书签by leizingyiu
Last modified : "2021/12/06 12:29:11"
`);
(function () {

    function evil(str) {
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.text = str;
        document.getElementsByTagName('head')[0].appendChild(script);
        document.head.removeChild(document.head.lastChild);
    }

    var replaceWhiteList = ['instagram.com'], replaceBoo = true;

    var pageSetUp = {
        divId: 'imgsByYiu',
        imgClass: 'daImgByYiu',
        otherHtml: '<div id="popbgByYiu"></div> <p id="popDiv"><img id="popImg"></p>',
        style: `
            #imgsByYiu li{
                display:inline;
                position:relative;
            }

            #imgsByYiu li i{
                position: absolute;
                right: 2vh;
                bottom: 2vh;
                font-size: 0.8rem;
                letter-spacing: 0.1rem;
                line-height: 1em;
                padding: 0.5vh;
                background: rgba(0,0,0,0.5);
                color: #fff;
            }
            img.daImgByYiu {
                max-height: 50vh;   margin: 1vh;   transition: auto;  transition: 0.5s; cursor: pointer;
            }

            img.daImgByYiu:hover {
                box-shadow: rgb(30 132 220 / 19% ) 0px 10px 50px, rgb(30 132 220 / 20% ) 0px 2px 10px;  transform: scale(1.01);
            }

            .popbgByYiuOn {
                position: fixed; width: 100% ;    height: 100% ;  z - index: 999;   background: rgb(255 255 255 / 0.6);    top: 0; left: 0;    cursor: pointer;
            }

            #popDiv {
                display: block; position: fixed;    top: 50% ;  left: 50% ; z-index: 1000;  transform: translate(-50% , -50% ); overflow: auto; width: auto;    height: 100vh;  margin: 0;
            }

            #popImg {
                position: relative; max-height: 100vh;  cursor: zoom-in ;
            }

            .popDivZoomedIn{
                height: 100vh!important;
            }
            .popDivZoomedIn100Vw{
                height: 100vh!important;                width:100vw!important;
            }
            .popDivZoomedIn img,.popDivZoomedIn100Vw img{
                max-height:none!important;  max-width:none!important;cursor: zoom-out!important;
            }

            .popDivZoomedOut{
                height: auto!important;
            }
            .popDivZoomedOut img{
                max-height:98vh!important;                max-width:80vw!important;
            }

            *{transition: 0.5s;}
            #newBody{background:#fff;}
            #popDiv::-webkit-scrollbar {display: none;}
            .blur {	
                filter: url(blur.svg#blur); /* FireFox, Chrome, Opera */
                -webkit-filter: blur(10px); /* Chrome, Opera */
                   -moz-filter: blur(10px);
                    -ms-filter: blur(10px);    
                        filter: blur(10px);
                filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=10, MakeShadow=false); /* IE6~IE9 */
            }
        `,
        scripts: `
        console.log("script run!!");
        p = document.querySelectorAll("#imgsByYiu img.daImgByYiu");

        function getImgNaturalDimension(img, callback) {
          if (typeof img.naturalWidth == "undefined") {
            var temImg = new Image();
            temImg.onload = function() {
              callback({width: temImg.width, height:temImg.height});
            };
            temImg.src = img.src;
          } else {
            callback({width: img.naturalWidth, height:img.naturalHeight});
          }
        }

        function onImg() {
            document.getElementsByTagName('html')[0].style.overflow="hidden";
            document.getElementById("imgsByYiu").className+=" blur ";
            console.log(document.getElementsByTagName('html')[0].style.overflow);

			
        	document.getElementById("popDiv").className = "popDivOn";

        	var daimg = document.getElementById("popImg");
        	daimg.src = this.src;
        	daimg.style.display = "block";

        	document.getElementById("popImg").className = "popImgOn";
        	document.getElementById("popbgByYiu").className = "popbgByYiuOn";

            document.getElementById("popDiv").className='popDivZoomedOut';
            
        }
        console.log("defined onImg()");

        for (i = 0; i < p.length; i++) {
        	p[i].onclick = onImg;
        }
        function offImg() {

            document.getElementsByTagName('html')[0].style.overflow="initial";
            document.getElementById("imgsByYiu").className=document.getElementById("imgsByYiu").className.replace("blur","");

        	document.getElementById("popbgByYiu").className = "";
        	document.getElementById("popDiv").className = "";

        	var daimg = document.getElementById("popImg");
        	daimg.style.display = "none";
        	daimg.className = "";
        	daimg.src = "";
        }
        console.log("defined offImg()");

        document.getElementById("popbgByYiu").onclick = offImg;
        
        document.getElementById("popImg").onclick = function() {
            console.log("click popImg");
            getImgNaturalDimension(this , function(dimension){
                console.log("实际尺寸：", dimension.width, dimension.height);
                console.log(document.body.clientWidth,document.body.clientHeight);
                if(dimension.width>window.innerWidth || dimension.height>window.innerHeight){
                    popDiv = document.getElementById("popDiv");
                    if(dimension.width>window.innerWidth){
                        popDiv.className=popDiv.className=='popDivZoomedIn100Vw'?'popDivZoomedOut':'popDivZoomedIn100Vw';
                        popDiv.scrollLeft=(popDiv.scrollWidth-popDiv.offsetWidth)/2;
                        popDiv.scrollTop=(popDiv.scrollHeight-popDiv.offsetHeight)/2;
                    }else{
                        popDiv.className=popDiv.className=='popDivZoomedIn'?'popDivZoomedOut':'popDivZoomedIn';
                    }
                    
                    
                }else{
                    document.getElementById("popDiv").className='popDivZoomedOut';
                    document.getElementById("popImg").style.cursor='default';
                }
            })
        };
        console.log("defined #popImg.onclick()");


    `
    };

    var replaceSomeWeb = {
        'huabanimg.com': {
            'reg': /_fw\d*(\/format\/.*)*/g,
            'result': ''
        },
        'sinaimg.cn': {
            'reg': /(\.sinaimg\.cn\/)([^/]+)(\/)/g,
            'result': '$1large$3'
        },
        'alicdn.com': {
            'reg': /(\S+)(jpg|png|jpeg|gif)(.+)/gi,
            'result': '$1$2'
        },
        'pinimg.com': {
            'reg': /(i.pinimg.com\/)[^\/]+(.+)/,
            'result': '$1originals$2'
        },
        'xiaohongshu.com': {
            'reg': /(.+)\?.+/,
            'result': '$1'
        },
        'duitang.com': {
            'reg': /\.thumb\.\d*_\d*/,
            'result': ''
        },
        'dribbble.com': {
            'reg': /\?[^\?]*/,
            'result': ''
        },
        'googleusercontent.com': {
            'reg': /(=[wh])\d*$/,
            'result': '$1' + '9999'
        },
        'media.niftygateway.com': {
            'reg': /(upload\/).*(\/v\d{8,})/,
            'result': '$1$2'
        },
        'cdn.dribbble.com': {
            'reg': /\?.*$/,
            'result': ''
        }
    };

    for (var i = 0; i < replaceWhiteList.length; i++) {
        if (window.location.href.indexOf(replaceWhiteList[i]) != -1) {
            replaceBoo = false
        };
    };

    main();

    function main() {
        var imgSrcList = imgLinkArray(document, replaceBoo, replaceSomeWeb);
        var bgUrlList = bgImgLinkArray(document, replaceBoo, replaceSomeWeb);
        var aHrefLink = ahrefImgLinkArray(document, replaceBoo, replaceSomeWeb);
        var mySrcList = [];
        mySrcList = mySrcList.concat(imgSrcList, bgUrlList, aHrefLink);

        [...document.getElementsByTagName("iframe")].map(frame => {
            try {
                frameDoc = frame.contentWindow.document;
                imgSrcList = imgLinkArray(frameDoc, replaceBoo, replaceSomeWeb);
                bgUrlList = bgImgLinkArray(frameDoc, replaceBoo, replaceSomeWeb);
                aHrefLink = ahrefImgLinkArray(frameDoc, replaceBoo, replaceSomeWeb);
                mySrcList = mySrcList.concat(imgSrcList, bgUrlList, aHrefLink)
            } catch (err) { };
        });
        mySrcList = [...new Set(mySrcList)];
        mySrcList = mySrcList.reverse();

        var pageCodeBlock = makeImgsCodeBlock(mySrcList.reverse(), pageSetUp['divId'], pageSetUp['imgClass'], pageSetUp['otherHtml'], pageSetUp['style'], pageSetUp['scripts']);

        replaceFullPage(pageCodeBlock);

        try { evil(pageSetUp['scripts']); } catch (err) { console.log(err) };


        [...document.querySelectorAll('img')].map(function (img) {
            if (img.id == 'popImg') { return }
            img.onload = function () {
                /*console.log(img);*/
                sizeTheImgs(img.parentElement);
            }
        });


        return void 0;
    };
    function imgLinkArray(obj, replaceBoo, replaceSomeWeb) {
        var result = [];
        var reg = /(\S+)(jpg|png|jpeg|gif|webp|bmp)(.+)/gi;
        var regData = /^data.*/g;
        for (var i = 0; i < obj.images.length; i++) {
            if (obj.images[i].hasAttribute("src")) {
                result[result.length] = obj.images[i].src
            } else if (obj.images[i].hasAttribute("lazy-scr-load")) {
                result[result.length] = obj.images[i].attributes["lazy-src-load"].value
            } else {
                try {
                    result[result.length] = obj.images[i].attributes[0].value
                } catch (err) {
                    /* console.log(obj.images[i])*/
                };
            };
            if (regData.test(result[result.length - 1]) != true && replaceBoo) {
                result[result.length] = result[result.length - 1].replace(reg, "$1$2")
            };
            result[result.length] = regReplaceForSomeWeb(result[result.length - 1], replaceSomeWeb);
        };
        return result;
    };
    function bgImgLinkArray(obj, replaceBoo, replaceSomeWeb) {
        let result = [];
        let all = obj.querySelectorAll('*');
        let bg = '';
        let reg = /(?:['"])[^'"]+/g;
        let reg2 = /(\S+)(jpg|png|jpeg|gif|webp|bmp)(.+)/gi;
        for (let j = 0; j < all.length; j++) {
            console.log(all[j].style);
            console.log(all[j].style.backgroundImage);
            if (all[j].style.backgroundImage == '' || all[j].style.backgroundImage == undefined) { continue; }
            bg = all[j].style.backgroundImage.match(reg);
            console.log(bg);
            if (bg != "" && bg != null) {
                [...bg].map(i => {
                    result[result.length] = i.replace(/^['"]/, '');
                    result[result.length - 1] = replaceBoo == true ? result[result.length - 1].replace(reg2, "$1$2") : result[result.length - 1];
                    result[result.length - 1] = regReplaceForSomeWeb(result[result.length - 1], replaceSomeWeb)
                });
            };
        };
        return result;
    }
    function ahrefImgLinkArray(obj, replaceBoo, replaceSomeWeb) {
        let result = [];
        let all = obj.querySelectorAll('a');
        let reg = /(url\(")(.*)("\))/g;
        let reg2 = /(\S+)(jpg|png|jpeg|gif)(.+)/gi;
        for (let j = 0; j < all.length; j++) {
            bg = all[j].href.match(/(\.jpg)|(\.gif)|(\.png)|(\.jpeg)|(\.webp)/) ? all[j].href : '';
            if (bg != "" || bg != undefined) {
                result[result.length] = String(bg).replace(reg, "$2");
                result[result.length - 1] = replaceBoo == true ? result[result.length - 1].replace(reg2, "$1$2") : result[result.length - 1];
                result[result.length - 1] = regReplaceForSomeWeb(result[result.length - 1], replaceSomeWeb)
            };
        };
        return result;
    }

    function sizeTheImgs(dom) {
        /* console.log(dom);*/
        let img = dom.querySelectorAll('img');
        for (let i = 0; i < img.length; i++) {
            let size = getImgNaturalDimensions(img[i]);
            let w = size[0];
            let h = size[1];
            let I = document.createElement('i');
            I.innerText = w + 'x' + h;
            img[i].parentNode.appendChild(I);
        };
    };

    function getImgNaturalDimensions(img, callback = function () { void 0 }) {
        var nWidth, nHeight;
        if (img.naturalWidth != undefined) { /* 现代浏览器*/
            nWidth = img.naturalWidth;
            nHeight = img.naturalHeight;
        } else { /* IE6/7/8*/
            var image = new Image();
            image.src = img.src;
            image.onload = function () {
                callback(image.width, image.height);
            };
        };
        return [nWidth, nHeight];
    }

    function makeImgsCodeBlock(imgList, divId, imgClass, otherHtml, style, scripts) {
        let result = document.createElement("div");
        let ul = document.createElement('ul');
        ul.id = divId;
        result.appendChild(ul);
        var li, img;
        console.log(imgList instanceof Array);

        if (imgList instanceof Array) {
            imgList.map(image => {
                li = document.createElement('li');
                img = document.createElement('img');
                img.classList.add(imgClass);
                img.src = image.replace(/_\/fw\/\d*\/format\/.*/g, '');
                ul.appendChild(li);
                li.appendChild(img);
            });
            console.log(ul);
        } else {
            Object.keys(imgList).map(k => {
                li = document.createElement('li');
                img = document.createElement('img');
                img.classList.add(imgClass);
                img.src = imgList[k].replace(/_\/fw\/\d*\/format\/.*/g, '');
                ul.appendChild(li);
                li.appendChild(img);

            });
            console.log(ul);

        };
        console.log(imgList, result);
        let styleDom = document.createElement('style');
        let scriptDom = document.createElement('script');
        styleDom.innerHTML = style;
        scriptDom.innerHTML = scripts;
        let tempDom = document.createElement('div');
        tempDom.innerHTML = otherHtml;
        [...tempDom.children].map(dom => {
            result.appendChild(dom);
        });
        result.appendChild(styleDom);
        result.appendChild(scriptDom);
        return result;
    };


    function regReplaceForSomeWeb(str, replaceSomeWeb) {
        var result = '';
        for (let r in replaceSomeWeb) {
            if (str.indexOf(r) != -1) {
                result = str.replace(replaceSomeWeb[r]['reg'], replaceSomeWeb[r]['result'])
            }
        };
        if (result == '') {
            result = str;
        };
        return result;
    }

    function replaceFullPage() {
        var sourceOnKeyDownStr = document.onkeydown == null ? 'null' : document.onkeydown.toString();
        var objs = arguments;
        var resultObj = document.createElement("div");
        resultObj.id = 'replacePageAsObjs';

        for (let i in objs) {
            if (objs[i] instanceof HTMLElement) {
                resultObj.appendChild(objs[i]);
            } else {
                resultObj.innerHTML += objs[i];
            }
        }
        var sourceBody = document.getElementsByTagName("body")[0];
        var html = document.getElementsByTagName("html")[0];
        var newBody = document.createElement("body");
        newBody.id = "newBody";
        newBody.appendChild(resultObj);

        html.appendChild(newBody);
        sourceBody.style.display = "none";
        /* html.removeChild(sourceBody); */
        var recovery = function (hiddenBody, sourceBody) {
            var html = document.getElementsByTagName("html")[0];
            var body = document.getElementsByTagName('body');
            html.removeChild(document.getElementById('newBody'));
            for (let i = 0; i < body.length; i++) {
                body[i].style.display = "";
            }
        };

        document.onkeydown = function (event) {
            var e = event || window.e;
            var keyCode = e.keyCode || e.which;
            switch (keyCode) {
                case 27:
                    document.getElementsByTagName('html')[0].style.overflow = "initial";
                    recovery(sourceBody, newBody);
                    document.onkeydown = eval(sourceOnKeyDownStr);
                    break;
            };
        };
    };

    console.log('来关注我微博 @leizingyiu 呀，虽然不怎么更新😀');
})();