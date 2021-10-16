javascript:

	(function () {
		var codeSource = prompt("请输入js代码", "(function(str){console.log(str);void 0;})('it runs!!')");

		copyStr(code2String(codeSource));
	})();


function code2String(codeStr) {
	var jsCode2jsStrReplace = {
		单引号: ["'", "\\'"],
		双引号: ['"', '\\"'],
		反斜杠: ['\\\\', '\\\\'],
		换行符: ['\\n', '\\n'],
		回车符: ['\\r', '\\r'],
		制表符: ['\\t', '\\t'],
		退格符: ['\\f', '\\b'],
		换页符: ['\\f', '\\f']
	};
	var result = "",
		txtMatch, reg;
	for (var i = codeStr.length - 1; i >= 0; i--) {


		for (var x in jsCode2jsStrReplace) {
			reg = eval("/" + jsCode2jsStrReplace[x][0] + "/");
			txtMatch = codeStr[i].match(reg);
			console.log(txtMatch);
			if (txtMatch != null) {
				break;
			}
		}


		if (txtMatch != null) {
			result = jsCode2jsStrReplace[x][1] + result;
		} else {
			result = codeStr[i] + result;
		}
	}
	result = "str='" + result + "';";
	console.log(result);
	return result;
}

function copyStr(str) {
	var a = document.createElement("textarea");
	a.value = str;
	document.body.appendChild(a);
	a.select();
	document.execCommand("Copy");
	a.className = "oInput";
	a.style.display = "none";
	alert(str, "内容已复制到剪贴板");
}