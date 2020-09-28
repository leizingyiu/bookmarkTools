/*
The MIT License (MIT)

Copyright (c) Sun Sep 27 2020  leizingyiu

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORTOR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/



javascript: (function () {
    var pageSetUp = {
        divId: 'imgsByYiu',
        imgClass: 'daImgByYiu',
        otherHtml: '<div id="popbgByYiu"></div> <p id="popDiv"><img id="popImg"></p>',
        style: `
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
                height: 100vh!important;
                width:100vw!important;
            }
            .popDivZoomedIn img,.popDivZoomedIn100Vw img{
                max-height:none!important;  max-width:none!important;cursor: zoom-out!important;
            }

            .popDivZoomedOut{
                height: auto!important;
            }
            .popDivZoomedOut img{
                max-height:100vh!important; max-width:80vw!important;
            }

            *{
                transition: 0.5s
            }

            #popDiv::-webkit-scrollbar {
                display: none;
            }
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
        console.log("script run!!")
        p = document.querySelectorAll("div#imgsByYiu img.daImgByYiu");

        function getImgNaturalDimension(img, callback) {
          if (typeof img.naturalWidth == "undefined") { // IE6/7/8
            var temImg = new Image();
            temImg.onload = function() {
              callback({width: temImg.width, height:temImg.height});
            }
            temImg.src = img.src;
          } else { // 现代浏览器
            callback({width: img.naturalWidth, height:img.naturalHeight});
          }
        }

        function onImg() {
            document.html.style.overflow="hidden";
            document.getElementById("imgsByYiu").className+=" blur ";
            console.log( document.html.style.overflow)
			
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

            document.html.style.overflow="initial"
            document.getElementById("imgsByYiu").className=document.getElementById("imgsByYiu").className.replace("blur","");

        	document.getElementById("popbgByYiu").className = "";
        	document.getElementById("popDiv").className = "";

        	var daimg = document.getElementById("popImg");
        	daimg.style.display = "none";
        	daimg.className = "";
        	daimg.src = ""
        };
        console.log("defined offImg()");

        document.getElementById("popbgByYiu").onclick = offImg;
        
        document.getElementById("popImg").onclick = function() {
            console.log("click popImg");
            getImgNaturalDimension(this , function(dimension){
                console.log("实际尺寸：", dimension.width, dimension.height);
                console.log(document.body.clientWidth,document.body.clientHeight)
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
        }
        console.log("defined #popImg.onclick()");

    `
    };

    var replaceSomeWeb = {
        'huabanimg.com': {
            'reg': /_fw\d*\/format\/.*/g,
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
        }
    };
    list = {};
    var numDiv = document.createElement("p");
    numDiv.style.position = "fixed";
    numDiv.style.left = "15px";
    numDiv.style.bottom = "10px";
    numDiv.style.zIndex = "999999999";
    numDiv.style.padding = "1em";
    numDiv.style.background = "rgba(102, 102, 102,0.8)";
    numDiv.style.textAlign = 'center';
    numDiv.style.color = '#fff';
    let obj = document.getElementsByClassName("pin");
    for (i = 0; i < obj.length; i++) {
        if (Boolean(obj[i].querySelector("a.layer-view>img")) != false) {
            list[obj[i].getAttribute("data-id")] = obj[i].querySelector("a.layer-view>img").src;
        }
    }
    numDiv.innerText = '已经获取 ' + Object.getOwnPropertyNames(list).length + " 张图片,按enter提取";
    document.getElementsByTagName("html")[0].appendChild(numDiv);

    function addToList() {
        obj = document.getElementsByClassName("pin");
        for (i = 0; i < obj.length; i++) {
            if (Boolean(obj[i].querySelector("a.layer-view>img")) != false) {
                list[obj[i].getAttribute("data-id")] = obj[i].querySelector("a.layer-view>img").src;
            }
        }
        numDiv.innerText = '已经获取 ' + Object.getOwnPropertyNames(list).length + " 张图片,按enter提取";
        console.log(numDiv.innerText)
    }
    var targetNode = document.getElementsByTagName('body')[0];
    var config = {
        attributes: true,
        childList: true,
        subtree: true
    };
    var observer = new MutationObserver(addToList);
    observer.observe(targetNode, config);

    function makeImgsCodeBlock(imgList, divId, imgClass, otherHtml, style, scripts) {

        var result = '';
        result += '<div id="' + divId + '" class="">';

        var imgDoms = '';
        for (var i in imgList) {
            imgDoms = '<img class="' + imgClass + '" src="' + imgList[i].replace(/_\/fw\/\d*\/format\/.*/g, '') + '">' + imgDoms;
        }

        result += imgDoms;
        result += '</div>';
        result += otherHtml;
        result += '<style>' + style + '</style>';
        result += '<script>' + scripts + '</script>';

        return result
    }

    function regReplaceForSomeWeb(str, replaceSomeWeb) {
        var result = '';
        for (let r in replaceSomeWeb) {
            console.log(r);
            console.log(str.indexOf(r))
            if (str.indexOf(r) != -1) {
                result = str.replace(replaceSomeWeb[r]['reg'], replaceSomeWeb[r]['result'])
            }
        }
        if (result == '') {
            result = str;
        }
        return result;
    }

    function replaceFullPage() {
        var sourceOnKeyDownStr = document.onkeydown == null ? 'null' : document.onkeydown.toString();
        var objs = arguments;
        var resultObj = document.createElement("div");
        resultObj.id = 'replacePageAsObjs';

        for (let i in objs) {
            resultObj.innerHTML += objs[i];
        }
        var sourceBody = document.getElementsByTagName("body")[0];
        var html = document.getElementsByTagName("html")[0];
        var newBody = document.createElement("body");
        newBody.id = "newBody";
        newBody.appendChild(resultObj);

        html.appendChild(newBody);
        sourceBody.style.display = "none";
        //html.removeChild(sourceBody);

        var recovery = function (hiddenBody, sourceBody) {
            var html = document.getElementsByTagName("html")[0];
            var body = document.getElementsByTagName('body');
            html.removeChild(document.getElementById('newBody'));
            for (let i = 0; i < body.length; i++) {
                body[i].style.display = "";
            }

        }
        document.onkeydown = function (event) {
            var e = event || window.e;
            var keyCode = e.keyCode || e.which;
            switch (keyCode) {
                case 27:
                    recovery(sourceBody, newBody);
                    document.onkeydown = eval(sourceOnKeyDownStr);
                    break
            }
        }
    }

    document.onkeydown = function (event) {
        var e = event || window.e;
        var keyCode = e.keyCode || e.which;
        switch (keyCode) {
            case 13:
                observer.disconnect();
                numDiv.remove();
                console.log(list);
                var result = makeImgsCodeBlock(list, pageSetUp['divId'], pageSetUp['imgClass'], pageSetUp['otherHtml'], pageSetUp['style'], pageSetUp['scripts']);
                replaceFullPage(result);
                eval(pageSetUp['scripts']);
                break;
        }
    }



})()
