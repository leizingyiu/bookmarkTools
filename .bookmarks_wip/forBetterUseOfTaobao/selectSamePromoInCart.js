javascript:
console.log(`
last modified: "2021/10/16 11:20:09"
`);
var promos = [...new Set([...document.querySelectorAll('.bd-content,.act-promo ul li')].map(function (dom) {
    let t = dom.innerText;
    if (t.indexOf('可跨店') != -1) {
        console.log(dom);
        dom.setAttribute('data-promo', t);
        return dom.innerText;
    } else { return false; }
}).filter(Boolean))];

console.log(promos);
[...document.querySelectorAll(".order-content")].map(shop => {
    shopInPromo = shop.querySelectorAll('[data-promo]');
    console.log(shopInPromo);
    
})

















