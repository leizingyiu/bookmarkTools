javascript: var v = document.getElementsByTagName("video");
for (var i = 0; i < v.length; i++) {
	v[i].setAttribute("controls", "controls");
	v[i].setAttribute("controlslist", "");
	v[i].setAttribute("style", "z-index:100000;position:fixed;left:0;top:0;max-height:80%;max-width:80%");
}
v[i].onmouseover = void 0;
var style = document.createElement('style');
style.innerHTML = "video::-webkit-media-controls-fullscreen-button {display: block;}video::-webkit-media-controls-play-button { display: block;}video::-webkit-media-controls-play-button { display: block;}video::-webkit-media-controls-timeline { display: block;}video::-webkit-media-controls-current-time-display{ display: block;}video::-webkit-media-controls-time-remaining-display { display: block;}video::-webkit-media-controls-time-remaining-display { display: block;}video::-webkit-media-controls-mute-button { display: block;}video::-webkit-media-controls-toggle-closed-captions-button { display: block;}video::-webkit-media-controls-volume-slider { display: block;}video::-webkit-media-controls { overflow: visible !important;}video::-webkit-media-controls-enclosure {width: 100% !important;margin: auto;}video::-internal-media-controls-download-button {display: block;}";
document.head.appendChild(style);
