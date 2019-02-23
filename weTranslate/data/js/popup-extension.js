'use strict';

function notifyExtension(event) {
    var targetElement = event.target || event.srcElement;
    if (targetElement.id == "translate_button") {
        var value = document.getElementById('data-language').value;
        var engine = document.getElementById('data-engine').value;
        var newTabOption = document.getElementById('new_tab_checkbox').checked;

        if (value != "0") {
            browser.runtime.sendMessage({
                "data": value,
                "engine": engine,
                "newTab": newTabOption
            });
        }
    }
}
window.addEventListener("click", notifyExtension);