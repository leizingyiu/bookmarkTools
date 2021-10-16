var consoleLog = function () {
    console.log(...arguments);
    return arguments;
}
var pretreament = {
    'instagram.com':async function () {
        let max = 2;
        const aList = [...document.querySelectorAll('main article a')];
        let result = [];
        for await (a of aList) {
            if (i > max) { break;}
            result[i] = new Promise((resolve, reject) => {
                fetch(a.href)
                    .then(respone => respone.text())
                    .then(t => consoleLog(t))
                // .then(t => t.match(/<script type="text\/javascript">window\.__additionalDataLoaded.*<\/script>/)[0].match(/(?<=>).*(?=<\/)/)[0].replace(/window\.__additionalDataLoaded\((.*)\)$/, '$1').replace(/;$/, ''))
                // .then(t => JSON.parse(t))
                // .then(result => (result['entry_data']['PostPage'][0].graphql.shortcode_media.display_resources[2].src))
                //.then(function (src) { a.querySelector('img').src = src; });
            });
        }
            
                      
        return Promise.all(result).then((i) => {
            console.log('all done');
            });;
    }
};

var pretreamentName = Object.keys(pretreament).map(i => window.location.href.indexOf(i) != -1 ? i : false).filter(Boolean).toString();
console.log(pretreamentName);

if (pretreamentName) {
    console.log('enter if');
    pretreament[pretreamentName]()
}


