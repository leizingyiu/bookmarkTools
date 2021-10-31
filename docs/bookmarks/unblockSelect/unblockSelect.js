javascript: "use strict";

[...document.querySelectorAll('*')].map(dom => {
    dom.style.cssText += `
    -webkit-touch-callout: auto!important;
    -webkit-user-select: auto!important;
    -khtml-user-select: auto!important;
    -moz-user-select: auto!important;
    -ms-user-select: auto!important;
    user-select: auto!important;`
});

!function () {
    var t = function (t) {
        t.stopPropagation(), t.stopImmediatePropagation && t.stopImmediatePropagation()
    };
    ["copy", "cut", "contextmenu", "selectstart", "mousedown", "mouseup", "keydown", "keypress", "keyup"].forEach(function (e) {
        document.documentElement.addEventListener(e, t, {
            capture: !0
        })
    }), console.log("解除限制成功啦！")
}();