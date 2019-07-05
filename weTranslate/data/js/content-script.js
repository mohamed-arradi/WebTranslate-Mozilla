"use strict";

// Detect Right Click and send text selection 
window.oncontextmenu = function () {
    var objectSelection = window.getSelection().toString();
    //lastSelectedElement = window.getSelection().anchorNode.parentNode;
    browser.runtime.sendMessage({ type: "text-copied", selectedText: objectSelection });
}

browser.runtime.onMessage.addListener(request => {
    showPopUpWithTranslation(request.translation, request.titleTranslation);
});

function showPopUpWithTranslation(translation, titleTranslation) {

    var modal = new tingle.modal({
        footer: true,
        stickyFooter: false,
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: "Close",
        cssClass: ['custom-class-1', 'custom-class-2'],
        onOpen: function () { },
        onClose: function () { },
        beforeClose: function () {
            return true;
        }
    });

    var content = '<h1 align="center"><strong>' + titleTranslation + '</strong></h1><br><br><h2>' + translation + '</h2>';

    modal.setContent(content);
    modal.addFooterBtn('OK', 'tingle-btn tingle-btn--primary', function () {
        modal.close();
    });
    modal.open();

}