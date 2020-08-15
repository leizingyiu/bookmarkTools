javascript: 
var v = document.getElementsByTagName("video");
var vList=document.createElement("div");
var body=document.getElementsByTagName("body")[0];
body.insertBefore(vList,body.firstChild);
var nList=[];
var j=0;
while(v.length>0){
    nList[j]=v[0].parentNode.removeChild(v[0]);
	nList[j].setAttribute("controls", "controls");
	nList[j].setAttribute("controlslist", "");
	nList[j].setAttribute("style", "max-height:80%;max-width:80%");
	nList[j].onmouseover = function(){void 0};
    j=j+1;
}
for (var i = 0; i < nList.length; i++) {vList.appendChild(nList[i]);}

var style = document.createElement('style');
style.innerHTML = "video::-webkit-media-controls-fullscreen-button {display: block;}video::-webkit-media-controls-play-button { display: block;}video::-webkit-media-controls-play-button { display: block;}video::-webkit-media-controls-timeline { display: block;}video::-webkit-media-controls-current-time-display{ display: block;}video::-webkit-media-controls-time-remaining-display { display: block;}video::-webkit-media-controls-time-remaining-display { display: block;}video::-webkit-media-controls-mute-button { display: block;}video::-webkit-media-controls-toggle-closed-captions-button { display: block;}video::-webkit-media-controls-volume-slider { display: block;}video::-webkit-media-controls { overflow: visible !important;}video::-webkit-media-controls-enclosure {width: 100% !important;margin: auto;}video::-internal-media-controls-download-button {display: block;}";
document.head.appendChild(style);
