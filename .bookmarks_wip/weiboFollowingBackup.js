javascript:
/**微博关注备份 */
function copyStr(str) {
    let a = document.createElement("textarea");
    a.value = str;
    document.body.appendChild(a);
    a.select();
    let maxLength = 300;
    let resultBoo = window.confirm('将以下内容复制到剪贴板?\n' + (str.length > maxLength ? str.substr(0, maxLength) + '......' : str));
    if (resultBoo == true) {
        document.execCommand("Copy");
    }
    a.style.display = "none";
    return resultBoo;
};

if (typeof arr !== "undefined" && arr !== null) {
    console.log(arr);
} else {
    arr = {};
}

console.log(document.querySelectorAll('.member_ul a[node-type=screen_name]'));

[...document.querySelectorAll('.member_li.S_bg1')].map(function (li) {
    let a = li.querySelector('.member_ul a[node-type=screen_name]');
    arr[a.title] = {};
    arr[a.title]['link'] = a.href.replace(/\?from=myfollow_all/g, '');
    let span = li.querySelector('.text.W_autocut.S_txt2');
    arr[a.title]['description'] = span.innerText;
    let relation = li.querySelector('div.statu > span');
    arr[a.title]['relation'] = relation.innerText;

});

console.log(JSON.stringify(arr));
console.log(Object.keys(arr).length);
console.log(Date());
if (document.querySelector('.W_pages a.S_bg1+a.page').innerText.indexOf('下') != -1) {
    copyStr(JSON.stringify(arr));
};
document.querySelector('.W_pages a.S_bg1+a.page').click();