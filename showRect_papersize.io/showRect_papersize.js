javascript:(function(){var a=document.querySelectorAll('a.paper');
var scale=window.prompt('mm/x=px？x=','2');
var A=[];
var sizeCompareList=[];

function sizeCompare(a,b){var xa,xb,ya,yb;
ax=Number(a.getElementsByTagName('em')[0].getAttribute('data-x'));
ay=Number(a.getElementsByTagName('em')[0].getAttribute('data-y'));
bx=Number(b.getElementsByTagName('em')[0].getAttribute('data-x'));
by=Number(b.getElementsByTagName('em')[0].getAttribute('data-y'));
var result=ax*ay-bx*by;
var consoleResult=result>0?'>':'<';
var compareStr=a.innerText+consoleResult+b.innerText;
compareStr=compareStr.replace(/\n/g,' ');
sizeCompareList.push(compareStr);
return result;
}

for(i=0;i<a.length;i++){
A[A.length]=a[i];
}
A.sort(sizeCompare);
/*console.log(JSON.stringify(sizeCompareList,' ',4));*/

var em,x,y,name,div;
for(i=0;i<A.length;i++){
a=A[A.length-i-1];
em=a.getElementsByTagName('em')[0];
x=em.getAttribute('data-x')/scale;
y=em.getAttribute('data-y')/scale;
name=a.querySelector('span.title').innerText;

div=document.createElement('div');
div.className='yiuRect';
div.innerText=name+'\n'+em.innerText;
div.style.padding='0.2em';
div.style.color='rgba(55,55,55,0.9)';
div.style.fontSize='10px';
div.style.width=x+'px';
div.style.height=y+'px';
div.style.border='1px solid rgba(200,200,200,0.5)';
div.style.position='fixed';
div.style.right='10px';
div.style.bottom='10px';
div.style.background='rgba(33,33,33,0.5)';
document.getElementsByTagName('body')[0].appendChild(div);
}

var s=document.createElement('style');
s.innerText='.yiuRect:hover{background-color:rgba(255,255,255,0.9) !important;box-shadow: 0px 0px 50px rgba(0,0,0,0.8)!important;}';
document.getElementsByTagName('body')[0].appendChild(s);})();null;
