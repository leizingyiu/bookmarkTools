javascript: (function () {
	console.log(`
	last modified: "2021/10/16 00:06:53"
	`);

	[...document.querySelectorAll('.J_TSaleProp a')].map(function (a) {
		if (a.style.backgroundImage != "") {
			a.style.backgroundImage = a.style.backgroundImage.replace(/(.+)((png|jpg).+jpg)(.?)/, "$1$3$4");
		} else {

			a.style.cssText = `display: inline-block;
							   padding: 3px 6px !important;`;
		}
	});

	var s = document.createElement("style");
	s.innerText = `.tb-prop .tb-img li a {
		box-sizing: border-box;	
		background-size: cover!important;
		min-width: 100%!important;
		display: block;
		padding-top: 100%!important;
		background-size: contain!important;
		background-position: top center!important;
		height: 100%!important;
	
	}
	
	.tb-prop .tb-img li a span {
		display: block!important;
		background: rgba(255,255,255,0.7);
		padding: 0 6px;
		line-height: 1.5em;
		text-indent: 0;
		white-space: break-spaces;
		height: 100%;
		padding: .5em;
		letter-spacing:0.1em
	}
	
	.tb-prop .tb-img li {
		float: none !important;
		display: inline-block !important;
		vertical-align: top !important;
		padding-bottom: 6px;
		display: inline-block;
		width: 30%;
	}

	`;
	document.getElementsByTagName("html")[0].appendChild(s);
	document.getElementById("J_ImgBooth").style.width = "100%";
	void 0;


	if (!CSS.supports("position", "sticky")) {

		function scroll() {
			var price = document.querySelector(".tb-promo-meta , .tm-fcs-panel");
			var priceRect = price.getBoundingClientRect();
			title = document.querySelector("#J_Title ,.tm-fcs-panel");
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
		var scrollFunc = function (e) {
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

	} else {

		let S = document.createElement('style');
		S.innerText = `#bd{
			overflow:visible!important;
		}
		.tb-gallery,.tb-meta.tb-promo-meta,.tb-meta{
			position: sticky;
			top: 0px;
			z-index: 100;
		}
		#detail .tb-summary .tb-item-info .tb-item-info-l{
			float:none!important;
		}
		#detail .tb-summary .tb-item-info{
			display:flex;
		}
		#J_Social{
			position:sticky!important;
			top:100%;
			transform:translate(0,-200%);
		}
		
		#detail .tb-wrap{
			margin:0!important;
		}
		#detail .tb-property{
			float:none!important;
			width:auto!important;
		}
		.tm-fcs-panel{
			position: sticky!important;
    		top: 0;
		}

		.tb-gallery .tb-booth {
			position: sticky!important;
			top: 0!important;
			display: table;
			table-layout: fixed;
			z-index: 1;
			width: 420px;
			height: 420px;
			margin: 20px auto 0;
		}

		.tb-gallery{
			margin-left:0!important;
			margin-right:40px;
		}
		.tb-gallery .tb-thumb-warp {
			position: sticky!important;
			top: 430px;
		}

		.tb-gallery .tm-action {
			padding: 38px 40px 25px;
			color: #999;
			position: sticky!important;
			top: 500px;
		}

		#J_DetailMeta>.tm-clear{
			display: flex;
			flex-direction: row-reverse;
		}
		`;

		document.getElementsByTagName("html")[0].appendChild(S);

	}
	return void 0;
})();
