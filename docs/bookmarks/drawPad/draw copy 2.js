data:text/html,<html><head><script src="https://cdn.bootcdn.net/ajax/libs/p5.js/1.4.0/p5.min.js"></script></head><body style="margin:0"><main></main><script>document.oncontextmenu=function(event){event.preventDefault()};var c1=[255,255,255],c2=[196,196,196],brushWeight=1;var beforeX,beforeY;function setup(){createCanvas(windowWidth,windowHeight);background(...c1)}function draw(){strokeWeight(brushWeight);if(mouseIsPressed){if(mouseButton===LEFT){stroke(...c2);blendMode(MULTIPLY)}if(mouseButton===RIGHT||mouseButton===CENTER){stroke(...c1);blendMode(LIGHTEST)}if(typeof beforeX!='undefined'){line(beforeX,beforeY,mouseX,mouseY)}beforeX=mouseX;beforeY=mouseY}else{beforeX=undefined;beforeY=undefined}}function mouseWheel(event){blendMode(LIGHTEST);fill(...c1);circle(windowWidth-100,windowHeight-100,brushWeight);brushWeight+=event.delta/10;console.log(brushWeight);brushWeight=brushWeight<0?1:brushWeight;brushWeight=brushWeight>100?100:brushWeight;blendMode(MULTIPLY);fill(...c2);circle(windowWidth-100,windowHeight-100,brushWeight)}</script><script>let url=document.getElementsByTagName('html')[0].innerHTML;history.pushState({url:'data:text/html,'+url,title:document.title},document.title,url);document.body.focus();</script></body></html>