a = '<a>heloWorld!!!!!</a>'

function replaceFullPage() {
    var sourceOnKeyDownStr = document.onkeydown == null ? 'null' : document.onkeydown.toString();
    var objs = arguments;
    var resultObj = document.createElement("div");
    resultObj.id = 'replacePageAsObjs';

    for (let i in objs) {
        resultObj.append(objs[i]);
    }
    var sourceBody = document.getElementsByTagName("body")[0];
    var html = document.getElementsByTagName("html")[0];
    var newBody = document.createElement("body");
    newBody.id = "newBody";
    newBody.appendChild(resultObj);

    html.appendChild(newBody);
    sourceBody.style.display = "none";
    //html.removeChild(sourceBody);

    var recovery = function (hiddenBody, sourceBody) {
        var html = document.getElementsByTagName("html")[0];
        var body = document.getElementsByTagName('body');
        html.removeChild(document.getElementById('newBody'));
        for (let i = 0; i < body.length; i++) {
            body[i].style.display = "";
        }

    }
    document.onkeydown = function (event) {
        var e = event || window.e;
        var keyCode = e.keyCode || e.which;
        switch (keyCode) {
            case 27:
                recovery(sourceBody, newBody);
                document.onkeydown = eval(sourceOnKeyDownStr);
                break
        }
    }
}


replaceFullPage(a);
