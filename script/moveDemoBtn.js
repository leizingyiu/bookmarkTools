function setDemoBtn(domSelector, pathSelector, n, pauseBeforePercent = 0, pauseAfterPercent = 100) {
    let containerId = 'demoContainer';
    let demoId = 'demoDom';

    let target = document.querySelector(domSelector);
    let container, demo;
    if (target.contains(document.querySelector(`${domSelector} #${demoId}`)) == false) {
        container = document.createElement('i');
        container.id = containerId;
        demo = document.createElement(target.localName);
        demo.id = demoId;
        target.appendChild(container);
        container.appendChild(demo);
    } else {
        container = target.querySelector('#' + containerId);
        demo = container.querySelector('#' + demoId);
    }



    setStyleDom('styleDemo', `
    #detail #${containerId}{
        position:relative;
    }
    #detail #${demoId} {
        content: var(--demo-btn-txt);
        font-size: 1em;
        display: block;
        position: absolute;
        left: 0;
        top: 0;

        width: -webkit-max-content;
        width: -moz-max-content;
    
        width: max-content;
        padding: inherit;
        border: inherit;
        border-radius: inherit;
        opacity: 1;
        transition: opacity 0.5s ease;
        background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.64) 50%, rgba(255, 255, 255, 0) 100%);
        color: rgba(0, 0, 0, 1);
        background-color: rgba(255, 255, 255, 0.8);
        border-color: rgba(0, 0, 0, 0.3);
        transition: color 0.2s ease, border-color 1s ease, background-color 1s ease !important;
        box-shadow: 0px 4px 12px 0px rgba(0 0 0 / 8%),
            0px 8px 32px 0px rgba(0 0 0 / 4%);
    
        z-index: -1;
    
        max-width: 110%;
        box-sizing: border-box;
    }
    
    #detail:hover #bookmarkBtn:after#${demoId} {
        animation-play-state: paused;
        border-color: rgba(0, 0, 0, 0) !important;
        background-color: rgba(255, 255, 255, 0) !important;
        color: rgba(0, 0, 0, 0);
        background-image: radial-gradient(circle,
                        rgba(255, 255, 255, 0) 0%,
                        rgba(255, 255, 255, 0) 50%,
                        rgba(255, 255, 255, 0) 100%);
        box-shadow: 0px 0px 12px 0px rgb(0 0 0 / 0%),
                    0px 0px 32px 0px rgb(0 0 0 / 0%);
    }

    

    `)

}
function setDemoBtnAnimation(domSelector, pathSelector, n, pauseBeforePercent = 0, pauseAfterPercent = 100) {
    let path = document.querySelector(pathSelector);
    console.log(path);
    let len = path.getTotalLength();

    let containerId = 'demoContainer';
    let demoId = 'demoDom';

    let points = [];
    points.push([0, 0]);
    let p0 = path.getPointAtLength(0);
    let point;
    for (let i = 1; i <= n; i++) {
        point = path.getPointAtLength(i / n * len);
        points.push([point.x - p0.x, point.y - p0.y]);
    }

    let createKeyframes = function (points, idx) {
        let axis = ['X', 'Y'];
        let result = '';

        result += `0%{transform:translate${axis[idx]}(${points[0]}px);} `

        for (let i = 0, ii = points.length; i < ii; i++) {
            result += `${i / ii * (pauseAfterPercent - pauseBeforePercent)}%{
                transform:translate${axis[idx]}(${points[i]}px);} `
        }
        result += `100%{transform:translate${axis[idx]}(${points[points.length - 1]}px);} `

        return result;
    }

    let xKeyframes = createKeyframes(points, 0);
    let yKeyframes = createKeyframes(points, 1);
    /** setting btn animate */


    let moRootName = 'moPoint';
    let ramNum = String(Math.floor(Math.random() * 10000));
    setDomCssText('html',
        `--demo-mo-x:${moRootName}x-${ramNum};
        --demo-mo-y:${moRootName}y-${ramNum};
        --demo-mo-opacity:${moRootName}opacity-${ramNum};`);



    setStyleDom('moveDemo', `
    @keyframes ${moRootName}x-${ramNum}{  ${xKeyframes}   }
    @keyframes ${moRootName}y-${ramNum}{  ${yKeyframes}   }

    @keyframes ${moRootName}opacity-${ramNum}{
        0%                        {opacity:0}
        ${pauseBeforePercent}%    {opacity:0.8}
        ${pauseAfterPercent}%     {opacity:0.8}
        100%                      {opacity:0}
    }

    #${containerId}{
        animation:  var(--demo-mo-y) 3s infinite,
                    var(--demo-mo-opacity) 3s infinite;
        animation-play-state: running;
    }
    #${demoId}{
    animation:  var(--demo-mo-x) 3s ease infinite,
                var(--demo-mo-opacity) 3s infinite;
    animation-play-state: running;
    }

  `);




}



function refleshDemo() {
    setDemoBtn('#bookmarkBtn', '#arrow', 4, 0, 64);
    setDemoBtnAnimation('#bookmarkBtn', '#arrow', 4, 0, 64);
}

refleshDemo();

var refleshingDemo = debounce(refleshDemo, 1000 / 40);


window.addEventListener('load', function winLoadDemo() {
    refleshingDemo();
});
window.addEventListener('resize', function winLoadDemo() {
    refleshingDemo();
});
document.getElementById('detail').addEventListener('scroll', function detailScrollDemo() {
    refleshingDemo();
});

// var observer = new MutationObserver(mutations => {
//     refleshingDemo();
// });

// observer.observe(document.getElementById('arrow'), {
//     attributes: true,
//     childList: true,
//     characterData: true,
//     subtree: true,
// });

