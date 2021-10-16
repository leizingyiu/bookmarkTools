javascript: function parseQueryString(url) {
	var obj = {};
	var keyvalue = [];
	var key = "",
		value = "";
	var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
	for (var i in paraString) {
		keyvalue = paraString[i].split("=");
		key = keyvalue[0];
		value = keyvalue[1];
		obj[key] = value
	}
	obj.valuesToStr = function() {
		var args = arguments;
		var resultStr = "?";
		for (var i = 0; i < args.length; i++) {
			resultStr += String(obj[args[i]]) == "undefined" ? "" : args[i] + "=" + obj[args[i]] + "&"
		};
		return resultStr
	};
	return obj
}
var myHref = window.location.href;
var obj = parseQueryString(myHref);
var newLocation = location.protocol + "//" + location.host + location.pathname + obj.valuesToStr("id", "keyword", "pageNo", "search");
window.location.href = newLocation;
