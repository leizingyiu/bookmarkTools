javascript:
(function(){
img=document.getElementsByTagName("img");
for(i=0;i<img.length;i++){
img[i].src=img[i].src.replace(/_fw\d*\/format\/.*/g,"")
}
})()
