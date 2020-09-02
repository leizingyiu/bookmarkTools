javascript: (function () {
    var priceBox = document.querySelector("#J_StrPriceModBox .tb-rmb-num , #J_StrPriceModBox .tm-price");

    var uls = document.querySelectorAll(".J_TSaleProp ");

    var form = {};

    for (let i = 0; i < uls.length; i++) {
        form[uls[i].getAttribute('data-property')] = {};
        lis = uls[i].getElementsByTagName('li');
        for (let j = 0; j < lis.length; j++) {
            form[uls[i].getAttribute('data-property')][lis[j].getElementsByTagName('span')[0].innerHTML] = {};
            form[uls[i].getAttribute('data-property')][lis[j].getElementsByTagName('span')[0].innerHTML]['btn'] = lis[j].getElementsByTagName('a')[0];
        }
    }

    function getObjChains() {
        var a = arguments;
        var obj = a[0];
        if (a.length > 1) {
            var n = a[1];
        } else {
            var n = Object.keys(obj).length - 1;
        }

        if (a.length > 1 && n == 0) {
            result = {};
            for (let i in obj[Object.keys(obj)[n]]) {
                if (obj[Object.keys(obj)[n]][i]['btn'].getAttribute('aria-disabled') != "true") {
                    obj[Object.keys(obj)[n]][i]['btn'].click();
                    result[i] = document.querySelector("#J_StrPriceModBox .tb-rmb-num , #J_StrPriceModBox .tm-price").innerText;
                    obj[Object.keys(obj)[n]][i]['btn'].click();

                } else {
                    result[i] = '--'
                }
            }
            return result;
        } else {
            var result = {};
            for (let i in obj[Object.keys(obj)[n]]) {
                console.log('i: ' + i);

                obj[Object.keys(obj)[n]][i]['btn'].click();
                var inner = getObjChains(obj, n - 1);
                for (let j in inner) {
                    result[i + ':' + j] = inner[j];
                }
                obj[Object.keys(obj)[n]][i]['btn'].click();

            }
            console.log('n: ' + n);
            console.log(result);
            return result;
        }
    }
    var daList = getObjChains(form);

    console.log(daList);

    var p = document.createElement("p");

    var reg = new RegExp('{"', "g");
    var reg1 = new RegExp('"}', "g");

    var reg2 = new RegExp('"*[^g]:"*', "g");
    var reg3 = new RegExp('","', "g");

    var str = JSON.stringify(daList);

    str = str.replace(reg, "<table><tr><td style='padding: 0.5em;'>");

    str = str.replace(reg2, '</td><td style="padding: 0.5em;">');
    str = str.replace(reg3, '</td></tr><td style="padding: 0.5em;">');

    str = str.replace(reg1, '</td></tr></table>');
    p.innerHTML = str;
    document.querySelector('.tb-amount').parentElement.insertBefore(p, document.querySelector('.tb-amount'));
})()
