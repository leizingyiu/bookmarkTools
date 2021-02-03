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

 let obj = document.getElementsByTagName("video");
 for (i = 0; i < obj.length; i++) {
     if (Boolean(obj[i].querySelector("a.layer-view>img")) != false) {
         list[obj[i].getAttribute("data-id")] = obj[i].querySelector("a.layer-view>img").src;
     }
 }

 numDiv.innerText = '已经获取 ' + Object.getOwnPropertyNames(list).length + " 张图片,按enter提取";
 document.getElementsByTagName("html")[0].appendChild(numDiv);

 vList = [];

 function collectVideo() {
     v = document.querySelectorAll('video');
     vList.push(...v);
     vList = [...new Set(vList)];
 }
 var targetNode = document.getElementsByTagName('body')[0];
 var config = {
     attributes: true,
     childList: true,
     subtree: true
 };
 var observer = new MutationObserver(collectVideo);
 observer.observe(targetNode, config);





 document.onkeydown = function (event) {
     var e = event || window.e;
     var keyCode = e.keyCode || e.which;
     switch (keyCode) {
         case 13:
             observer.disconnect();
             numDiv.remove();
             for (i in vList) {
                 var newv = document.createElement('video');
                 document.getElementsByTagName('body')[0].insertBefore(newv, document.getElementsByTagName('body')[0].firstChild);
             }
             break;
     }
 }
