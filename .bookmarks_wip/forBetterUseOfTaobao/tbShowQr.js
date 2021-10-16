javascript: (function () {
    var box = document.createElement("img");

    box.style = ` width:100px;
            height:100px;
            margin:20px;
            position:absolute;
            top:0px;left:-150px;
            z-index:1000000;`;
    box.src = document.querySelector("img.tm-qrcode-pic , .tb-qrcode-popup img").src;
    var detail = document.getElementById("detail");
    detail.style.position = 'relative';
    detail.appendChild(box);
    var detailY = detail.offsetTop;
    var detailTop = 0;
    var scrollY = 0;
    window.onscroll = function () {
        scrollY = document.documentElement.scrollTop;
        detailTop = scrollY - detailY;
        if (detailTop > 0) {
            box.style.top = (detailTop) + 'px';
        }
    };
})()