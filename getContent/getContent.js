javascript:
var u = window.location.href;
var dict = {
	'behance.net': "#project-canvas",
	'taobao.com': '#J_DivItemDesc',
	'weibo.com':'div.WB_feed'
};
var D = '';
for (let d in dict) {
	D = u.indexOf(d) != -1 ? d : D
};
if (D != "") {
	var p = document.querySelector(dict[D]);
	if(p!=null){
	var b = document.getElementsByTagName("body")[0];
	var h = document.getElementsByTagName("html")[0];
	h.removeChild(b);
	var pr = document.createElement("pre");
	pr.innerText = b.innerHTML;
	pr.style.display = "none";
	var bo = document.createElement("body");
	h.appendChild(bo);
	bo.appendChild(p);
	bo.appendChild(pr);

	function recovery(pr, bo) {
		var b = document.createElement("body");
		b.innerHTML = pr.innerText;
		var h = document.getElementsByTagName("html")[0];
		h.removeChild(h.getElementsByTagName('body')[0]);
		h.appendChild(b)
	}
	document.onkeydown = function(event) {
		var e = event || window.e;
		var keyCode = e.keyCode || e.which;
		switch (keyCode) {
		case 27:
			recovery(pr, bo);
			break
		}
	}}
}
