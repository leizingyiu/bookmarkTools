javascript: [...document.querySelectorAll('h5.feed-block-title')].map(h5 => {
    let text = h5.innerText.replace(/(\([^\)]*\))|(\[[^\]]*\])|(「[^」]*」)|(（[^）]*）)/g, '');
    let price = text.match(/[\d.]+(?=元)/);
    let gram = text.match(/[\d.]+(([千克]{1,})|([kgKG]{1,}))(\*\d{1,})*/);
    let vol = text.match(/[\d.]+(([毫升]{1,})|([mlML]{1,}))(\*\d{1,})*/);
    let priceText = '', priceKg, priceL;
    if (price == null || (gram == null && vol == null)) {
        priceText = '--';
    } else {
        price = Number(price[0]);

        if (gram != null) {
            gram = Number(eval(gram[0].replace(/[克gG]/g, '').replace(/[k千]/, '*1000')));
            priceKg = price / gram * 1000;
            priceText = priceKg.toFixed(2) + '/kg';

        } else if (vol != null) {
            vol = Number(eval(vol[0].replace(/[升lL]/g, '').replace(/[毫mM]/, '/1000')));
            priceL = price / vol;
            priceText = priceL.toFixed(2) + '/L';
        } else { priceText = '___'; }

    }
    let redBox = h5.querySelectorAll('a')[1];
    redBox.style.display = 'block';
    redBox.children[0].style.float = 'left';
    let span = document.createElement('span');
    span.innerText = priceText;
    span.style.float = 'right';
    redBox.appendChild(span);
});