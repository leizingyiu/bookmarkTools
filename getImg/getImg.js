javascript: /*获取图片书签by leizingyiu；*/
 (function() {
 	console.log("%E8%8E%B7%E5%8F%96%E5%9B%BE%E7%89%87%E4%B9%A6%E7%AD%BEby leizingyiu @20200803-15:08:59");
 	var mySrc = '';
 	var mySrcList = [];
 	var imgSrcList = [];
 	var bgUrlList = [];
 	var replaceWhiteList = ['instagram.com'];
 	var replaceBoo = true;
 	var replaceSomeWeb = {
 		'huabanimg.com': {
 			'reg': /_fw\d*\/format\/.*/g,
 			'result': ''
 		},
 		'sinaimg.cn': {
 			'reg': /(\.sinaimg\.cn\/)([^/]+)(\/)/g,
 			'result': '$1large$3'
 		},
 		'alicdn.com': {
 			'reg': /(\S+)(jpg|png|jpeg|gif)(.+)/gi,
 			'result': '$1$2'
 		},
   'pinimg.com': {
			'reg': /(i.pinimg.com\/)[^\/]+(.+)/,
			'result': '$1originals$2'
		}
 	};
 	for (var i = 0; i < replaceWhiteList.length; i++) {
 		if (window.location.href.indexOf(replaceWhiteList[i]) != -1) {
 			replaceBoo = false
 		}
 	}

 	imgSrcList = imgLinkArray(document, replaceBoo, replaceSomeWeb);
 	bgUrlList = bgImgLinkArray(document, replaceBoo, replaceSomeWeb);
 	mySrcList = mySrcList.concat(imgSrcList, bgUrlList);

 	var myFrame = document.getElementsByTagName("iframe");
 	var frameDoc;
 	for (j = 0; j < myFrame.length; j++) {
 		if (myFrame[j].scrollWidth != 0 || myFrame[j].scrollHeight != 0) {
 			try {
 				frameDoc = myFrame[j].contentWindow.document;
 				imgSrcList = imgLinkArray(frameDoc, replaceBoo, replaceSomeWeb);
 				bgUrlList = bgImgLinkArray(frameDoc, replaceBoo, replaceSomeWeb);
 				mySrcList = mySrcList.concat(imgSrcList, bgUrlList)
 			} catch (err) {}
 		}
 	}
    mySrcList =[...new Set(mySrcList)]
 	mySrc = makeImgPage(mySrcList);
    
 	var myStyle = "<style>img{max-width:100vw;}</style>";
 	if (mySrc != '') {
 		document.write(myStyle + '<center>' + mySrc + '</center>');
 		void(document.close())
 	} else {
 		alert('No images!')
 	}
 	void 0;

 	function imgLinkArray(obj, replaceBoo, replaceSomeWeb) {
 		var result = [];
 		var reg = /(\S+)(jpg|png|jpeg|gif)(.+)/gi;
 		var regData = /^data.*/g;
 		for (var i = 0; i < obj.images.length; i++) {
 			if (obj.images[i].hasAttribute("src")) {
 				result[result.length] = obj.images[i].src
 			} else if (obj.images[i].hasAttribute("lazy-scr-load")) {
 				result[result.length] = obj.images[i].attributes["lazy-src-load"].value
 			} else {
 				try {
 					result[result.length] = obj.images[i].attributes[0].value
 				} catch (err) {
 					console.log(obj.images[i])
 				}
 			}
 			if (regData.test(result[result.length - 1]) != true && replaceBoo) {
 				result[result.length - 1] = result[result.length - 1].replace(reg, "$1$2")
 			}
 			result[result.length - 1] = regReplaceForSomeWeb(result[result.length - 1], replaceSomeWeb);
 		}
 		return result
 	}

 	function makeImgPage(imgArray) {
 		var result = "";
 		for (var i = 0; i < imgArray.length; i++) {
 			result += '<img src=' + imgArray[i] + '><br>'
 		}
 		return result
 	}

 	function getAllChildren(obj) {
 		var result = [];
 		for (var i = 0; i < obj.childElementCount; i++) {
 			result = result.concat(obj.children[i]);
 			if (obj.children[i].childElementCount !== 0) {
 				result = result.concat(getAllChildren(obj.children[i]))
 			}
 		}
 		return result
 	}

 	function bgImgLinkArray(obj, replaceBoo, replaceSomeWeb) {
 		var result = [];
 		var all = getAllChildren(obj);
 		var bg;
 		var reg = /(url\(")(.*)("\))/g;
 		var reg2 = /(\S+)(jpg|png|jpeg|gif)(.+)/gi;
 		for (var j = 0; j < all.length; j++) {
 			bg = all[j].style.backgroundImage;
 			if (bg != "" || bg != undefined) {
 				result[result.length] = String(bg).replace(reg, "$2");
 				result[result.length - 1] = replaceBoo == true ? result[result.length - 1].replace(reg2, "$1$2") : result[result.length - 1];
 				result[result.length - 1] = regReplaceForSomeWeb(result[result.length - 1], replaceSomeWeb)
 			}
 		}
 		return result
 	}

 	function regReplaceForSomeWeb(str, replaceSomeWeb) {
 		var result = '';
 		for (let r in replaceSomeWeb) {
 			console.log(r);
 			console.log(str.indexOf(r))
 			if (str.indexOf(r) != -1) {
 				result = str.replace(replaceSomeWeb[r]['reg'], replaceSomeWeb[r]['result'])
 			}
 		}
 		if (result == '') {
 			result = str;
 		}
 		return result
 	}
 	console.log('%E6%9D%A5%E5%85%B3%E6%B3%A8%E6%88%91%E5%BE%AE%E5%8D%9A @leizingyiu %E5%91%80%EF%BC%8C%E8%99%BD%E7%84%B6%E4%B8%8D%E6%80%8E%E4%B9%88%E6%9B%B4%E6%96%B0%F0%9F%98%80')
 })() /*来关注我微博 @leizingyiu 呀，虽然不怎么更新😀*/
