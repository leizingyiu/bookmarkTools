javascript:
(function() {
var size=100;/*size in px*/
	var shopList = document.getElementsByClassName("J_TSaleProp");
	for (var i = 0; i < shopList.length; i++) {
		var a = shopList[i].getElementsByTagName("a");
		for (var j = 0; j < a.length; j++) {
			if (a[j].style.backgroundImage != "") {
				a[j].style.backgroundImage = a[j].style.backgroundImage.replace(/(.+)(jpg.+jpg)(.+)/, "$1jpg$3");;
				a[j].style.backgroundSize = "cover";
				a[j].style.width = size+'px';
				a[j].style.height = size+'px';
				a[j].getElementsByTagName("span")[0].style = "display: block;    bottom: 0;    position: absolute;    left: 50%;    transform: translateX(-50%);    background: rgba(255,255,255,0.7);    padding: 0 6px;    line-height: 1.25em;";
			}
		}
	}
	document.getElementById("J_ImgBooth").style.width = "100%";
	void 0;
})();
