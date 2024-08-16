javascript: (() => {
    if (decodeURI(window.location.href).match('新片场素材ID') == null) {
        alert('当前打开的文件名不是新片场的DEMO文件名');
        return;
    };
    id = window.location.href.match(/(?<=-)[a-zA-Z0-9]+(?=-)/);
    id = id ? id[0] : "";
    window.location.href = id == "" ? "" : `https://stock.xinpianchang.com/footage/details/${id}.html`;
})();