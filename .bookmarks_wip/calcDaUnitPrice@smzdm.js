javascript:
{let title=document.querySelectorAll('.feed-block-title');

[...title].map(i=>(function(){
let num=i.querySelector('.feed-nowrap').innerText.match(/(\*\d+)|\+/g);
try{num=num==null?i.querySelector('.feed-nowrap').innerText.match(/×\d+/g).map(j=>j.replace(/×/g,'*')):num;}catch(err){}

let money=i.querySelector('.z-highlight').innerText.match(/[0-9.]+(?=元)/g);
money=money==null?0:money[0];

num=num==null?1:num.join('').replace(/^(\*)/g,'1$1').replace(/(\+)(\*)/g,'$11$2');
let n=1;
try{
n=num==''?1:eval(num);
}catch(err){
n=1;
}
i.querySelector('.z-highlight').innerText+='\n\t'+money+'元/'+n+'  =  '+(money/n).toFixed(2);
//console.log(i.innerText+'\n'+num+'\n'+n+'\n'+money);
return money+'元/'+n+'  =  '+(money/n).toFixed(2);
})());

[...document.querySelectorAll('.feed-block-title')].map(i=>(function(){
i.style.height='auto';
})())}
