javascript:
var site, user, project, _, brunch = 'main', path;
window.location.href.replace(/.*\/\//, '').replace(/\//g, function (__, i, sentence) {
    console.log(arguments);
    let I = i;
    let idxArray = [];
    sentence.replace(/\//g, function (__, idx, s) {
        idxArray.push(idx);
    });
    idxArray.unshift(0);
    idxArray.push(sentence.length);

    let current = ['site', '_', 'user', 'project', 'path'][idxArray.indexOf(i) - 1];
    if (current == 'path') { I = sentence.length; }
    let currentContent = sentence.slice(idxArray[idxArray.indexOf(i) - 1], I).replace(/^\//, '');
    console.log(current, '=', currentContent);
    window[current] = currentContent;
});

var newUrl = `https://github.com/${user}/${project}/blob/${brunch}/${path}`;

window.location = newUrl;


