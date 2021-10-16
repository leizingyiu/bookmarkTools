var target = prompt("请输入打开链接的上一级的class或者id", "");
var father;
if (target == "") {
	father = document;
} else if (document.getElementById(target) != undefined) {
	father = document.getElementById(target);
} else {

	father = document.getElementsByClassName(target);
}


console.log(father);

var kids = [];

function kidsArray(obj) {
	var result = [];
	var temp;
	if (obj.length != undefined) {
		for (var i = 0; i < obj.length; i++) {

			result[result.length] = obj[i];
			if (obj[i].hasChildNodes == true) {
				result = result.concat(kidsArray(obj[i].children))
			}

		}
	}else{result=result.concat([kidsArray(obj.children)]);}
	return result;
}

kids = kidsArray(father);
console.log(kids);
