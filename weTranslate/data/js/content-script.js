"use strict";

window.oncontextmenu = function () {
    var objectSelection = window.getSelection().toString();
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

    var content = '<h2 align="center"><strong><u>' + titleTranslation + '</u></strong></h2><br/><p style="font-size:50px" align="center">&#128526;</p><br/><br/><h2><strong>' + translation + '<strong></h2>';

    modal.setContent(content);
    modal.addFooterBtn('OK', 'tingle-btn tingle-btn--primary', function () {
        modal.close();
    });
    modal.open();

}