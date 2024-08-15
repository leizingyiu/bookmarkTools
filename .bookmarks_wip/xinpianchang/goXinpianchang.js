javascript: (() => {
    id = window.location.href.match(/(?<=-)[a-zA-Z0-9]+(?=-)/);
    id = id ? id[0] : '';
    window.location.href = id = '' ? '' : `https://stock.xinpianchang.com/footage/details/${id}.html`;
})();