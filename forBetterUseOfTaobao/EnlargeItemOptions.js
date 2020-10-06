javascript: (function() {
	var size = 93;
	var shopList = document.getElementsByClassName("J_TSaleProp");
	for (var i = 0; i < shopList.length; i++) {
		var a = shopList[i].getElementsByTagName("a");
		for (var j = 0; j < a.length; j++) {
			if (a[j].style.backgroundImage != "") {
				a[j].style.backgroundImage = a[j].style.backgroundImage.replace(/(.+)((png|jpg).+jpg)(.?)/, "$1$3$4");
			} else {
				a[j].style.minHeight = '0px';
				a[j].style.minWidth = '0px';
				a[j].style.width = '100%';
				a[j].style.textAlign = 'left';
				a[j].getElementsByTagName("span")[0].style.marginTop = "0";
				a[j].parentElement.style.width = '100%';

			}
		}
	}
	var s = document.createElement("style");
	s.innerText = ".tb-prop .tb-img li a{box-sizing: border-box;padding:0!important;background-size:contain!important;background-position:top center!important;height:auto!important;min-height:" + size + "px;min-width:" + size + "px!important}.tb-prop .tb-img li a span{padding:2px 2px;display:block!important;background:rgba(255,255,255,.7);line-height:1.25em;text-indent:0;white-space:break-spaces;width:100%;margin-top:100%}.tb-prop .tb-img li{float:none!important;display:inline-block!important;vertical-align:top!important;padding-bottom: 6px;}";
	document.getElementsByTagName("html")[0].appendChild(s);
	document.getElementById("J_ImgBooth").style.width = "100%";
	void 0;

	function scroll() {

		var price = document.getElementsByClassName("tb-promo-meta")[0];
		var priceRect = price.getBoundingClientRect();
		title = document.getElementById("J_Title");
		titleRect = title.getBoundingClientRect();

		var c = document.querySelector(".tb-item-info-l,.tb-gallery");
		var cRect = c.getBoundingClientRect();
		var p = c.parentElement;
		var pRect = p.getBoundingClientRect();
		var pTop = pRect.top;
		var pBottom = pTop + p.clientHeight;
		if (pTop < 0 && pBottom > c.clientHeight - Number(c.style.paddingTop.replace('px', ''))) {
			c.style.paddingTop = (20 - pTop) + 'px'
		} else if (pTop < 0 && pBottom < c.clientHeight - Number(c.style.paddingTop.replace('px', ''))) {
			c.style.paddingTop = p.clientHeight - c.clientHeight + -Number(c.style.paddingTop.replace('px', '')) + 'px'
		} else {
			c.style.paddingTop = '20px';
		}

		if (pTop < -titleRect.height && pTop > -p.clientHeight) {
			price.style.position = 'fixed';
			price.style.top = 0;
			document.getElementById("J_logistic").style.marginTop = priceRect.height + "px";
		} else {
			price.style.position = 'relative';
			price.style.top = 'auto';
			document.getElementById("J_logistic").style.marginTop = 0;
		}

		void 0;
		return null
	}
	var scrollFunc = function(e) {
			e = e || window.event;
			if (e.wheelDelta) {
				scroll()
			}
		};
	document.body.onscroll = scrollFunc;
	scroll();
	if (document.addEventListener) {
		document.addEventListener('DOMMouseScroll', scrollFunc, false)
	}
	window.onmousewheel = document.onmousewheel = scrollFunc;
	void 0
})();
