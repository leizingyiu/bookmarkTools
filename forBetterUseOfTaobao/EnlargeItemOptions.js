javascript: (function() {
	var size = 93; /*size in px*/
	var shopList = document.getElementsByClassName("J_TSaleProp");
	for (var i = 0; i < shopList.length; i++) {
		var a = shopList[i].getElementsByTagName("a");
		for (var j = 0; j < a.length; j++) {
			if (a[j].style.backgroundImage != "") {
				a[j].style.backgroundImage = a[j].style.backgroundImage.replace(/(.+)(jpg.+jpg)(.+)/, "$1jpg$3");
				a[j].getElementsByTagName("span")[0].style.display="inline-block!important";
			}
		}
	}
	var s=document.createElement("style");
	s.innerText=".tb-prop .tb-img li a{background-size:cover!important;min-height:"+size+"px!important; min-width:"+size+"px!important}.tb-prop .tb-img li a span{display: block!important; bottom: 0; position: absolute; left: 50%; transform: translateX(-50%); background: rgba(255,255,255,0.7); padding: 0 6px; line-height: 1.25em;text-indent:0;white-space: break-spaces;}"
	document.getElementsByTagName("html")[0].appendChild(s);

	document.getElementById("J_ImgBooth").style.width = "100%";
	void 0;
})();
