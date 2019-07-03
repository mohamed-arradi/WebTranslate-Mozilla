"use strict";

function addScript(src) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.onload = function () {
        console.log("Script loaded and ready");
    };
    script.src = src;
    document.getElementsByTagName('head')[0].appendChild(script);
}

var lastSelectedElement;

// Detect Right Click and send text selection 
window.oncontextmenu = function () {
    var objectSelection = window.getSelection().toString();
    lastSelectedElement = window.getSelection().anchorNode.parentNode;

    // tippy('#' + lastSelectedElement.id, {
    //     content: 'Tooltip',
    // });
    browser.runtime.sendMessage({ type: "text-copied", selectedText: objectSelection });
}

browser.runtime.onMessage.addListener(request => {
    alert(request.translation);
});

