function runCnJs(fn) {
    var cnToJs_dict = {
        '设': 'var ',
        '如果': 'if ',
        '否则': 'else ',
        '输出': 'console',
        '记录': 'log',
        '并且': '&&',
        '或者': '||',
        '除非': '!',
        '符合': 'switch',
        '情况': 'case',
        '跳过': 'break',
        '继续': 'continue',
        '默认': 'default',
        '对于': 'for',
        '当': 'while',
        '执行': 'do',
        '测类型': 'typeof ',
        '空': 'null',
        '未定义': 'undefined',
        '字符串': 'String',
        '数字': 'Number',
        '布尔': 'Boolean',
        '对象': 'Object',
        '函数': 'function',
        '返回': 'return',
        '：': ':',
        '；': ';',
        '（': '(',
        '）': ')',
        '「': '{',
        '」': '}',
        '。': '.',
        '的': '.',
        '“': '"',
        '”': '"',
        '‘': "'",
        '’': "'",
        '': '',
    }
    var fnStr = fn.toString().replace(/return runCnJs\([^\)]+\)\.apply\(this, arguments\);/g, '').replace(/`/g, '');
    for (let key in Object.keys(cnToJs_dict)) {
        let reg = RegExp(Object.keys(cnToJs_dict)[key], 'g');
        fnStr = fnStr.replace(reg, cnToJs_dict[Object.keys(cnToJs_dict)[key]]);
    }
    return eval('(' + fnStr + ')')
}

function main() {
    return runCnJs(main).apply(this, arguments);
    `
    设 a = 0 ；
    设 b = 1 ；
    如果（a>b）「
        输出。记录（“a大于b”）；
    」否则「
        输出的记录（“a小于b”）；
    」
    

    设 t = 10 ；
    符合（t）「
        情况 9：
            输出的记录（“现在是9点”）；
            跳过；
        情况 10：
            输出的记录（“现在是10点”）；
            跳过；
        情况 11：
            输出的记录（“现在是11点”）；
            跳过；
        默认：
            输出的记录（“这是默认情况，不知道现在几点”）；
    」


`
}



`
    设 a = 1 ；
    设 b = 2 ；
    设 c = a + b ；
    输出的记录（‘输 出 ： c等于’+c）；
    返回 c；
    `
main()
