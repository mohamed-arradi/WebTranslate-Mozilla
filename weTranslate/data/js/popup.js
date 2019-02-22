'use strict';

function notifyExtension(event) {
    var targetElement = event.target || event.srcElement;
    if (targetElement.id == "translate_button") {
        var value = document.getElementById('data-language').value;
        var engine = document.getElementById('data-engine').value;

        if (value != "0") {
            browser.runtime.sendMessage({
                "data": value,
                "current_url": window.location.href,
                "engine": engine
            });
        }
    }
}
window.addEventListener("click", notifyExtension);