javascript:


	var myFrame = [];
var reg = "/(.+\\D)(\\dNUM)(END)$/g";

var urlEnd = prompt("请输入网址规律数字之后的内容,不填默认为空", "");
urlEnd = urlEnd.replace(".", "\.");

var addZero = confirm("补0吗？");

var regTest = "";
regTest = reg.replace("NUM", "+");
regTest = regTest.replace("END", urlEnd);
regTest = eval(regTest);
console.log(regTest);

var nowUrl = window.location.href;
if (regTest.test(nowUrl)) {

	var MaxPages = prompt("请输入打开页面最大数量", 10);

	var urlNum = nowUrl.replace(regTest, "$2");
	console.log(urlNum);

	var urlNumLength = urlNum.length;
	console.log(urlNumLength);

	if (String(MaxPages).length > urlNumLength) {
		var sureMax = confirm("确定打开数量比地址栏数字多的页面吗？");
	} else {
		var sureMax = true;
	}

	var nLength = Math.min(MaxPages.length, urlNumLength);
	console.log(nLength);

	var regUse = "";
	regUse = reg.replace("NUM", "{" + nLength + "}");
	regUse = regUse.replace("END", urlEnd);

	if (urlNumLength > MaxPages.length) {
		regUse = regUse.replace("\\D", "");
	}
	regUse = eval(regUse);
	console.log(regUse);


	var t = sureMax ? MaxPages : Math.min(Number(MaxPages), Math.pow(10, urlNumLength));
	console.log(t);

	var frameUrl = "";
	var numAdd = "";
	var replaceNum = nowUrl.replace(regUse, "$2") - 0;
	console.log(replaceNum);
	for (var i = 0; i < t; i++) {
		numAdd = replaceNum + i + 1;
		if (numAdd.toString().length < t.toString().length && addZero==true) {
			for (var j = 1; j < t.length; j++) {
				numAdd = "0" + numAdd;
			}
		}
		console.log(numAdd);

		frameUrl = nowUrl.replace(regUse, "$1" + (numAdd) + "$3");
		console.log(frameUrl);

		myFrame[i] = document.createElement("iframe");
		myFrame[i].src = frameUrl;
		myFrame[i].style.width = "99vw";
		myFrame[i].style.height = "100vh";
		myFrame[i].style.overflow = "scroll";

	}
	for (j = 0; j < myFrame.length; j++) {

		document.lastChild.appendChild(myFrame[j]);
		console.log(myFrame[j].src.value);
	}

} else {
	alert("请找到有规律的数字");
}
void 0;
