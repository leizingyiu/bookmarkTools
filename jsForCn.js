function runCnJs(fn) {
    var cnToJs_dict = {
        '设': 'var ',
        '如果': 'if ',
        '否则': 'else ',
        '输出': 'console',
        '记录': 'log',
        '；': ';',
        '（': '(',
        '）': ')',
        '「': '{',
        '」': '}',
        '的': '.',
        '“': '"',
        '”': '"',
        '‘': "'",
        '’': "'",
    }
    var fnStr = fn.toString().replace(/return runCnJs\([^\)]+\)\.apply\(this, arguments\);/g, '').replace(/`/g, '');
    for (let key in Object.keys(cnToJs_dict)) {
        let reg = RegExp(Object.keys(cnToJs_dict)[key], 'g');
        fnStr = fnStr.replace(reg, cnToJs_dict[Object.keys(cnToJs_dict)[key]]);
    }
    return eval('(' + fnStr + ')')
}

function main() {
    return runCnJs(fn).apply(this, arguments);
    `
设 a= 0；
设 b=1；
如果（a>b）「
    输出的记录（“a大于b”）；
」否则「
    输出的记录（“a小于b”）；
」
`
}

main()
