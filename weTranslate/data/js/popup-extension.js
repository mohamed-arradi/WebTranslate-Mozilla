'use strict';

function notifyExtension(event) {
    var targetElement = event.target || event.srcElement;
    if (targetElement.id === "translate_button") {
        var lang = document.getElementById('data-language').value;
        var engine = document.getElementById('data-engine').value;
        var newTabOption = document.getElementById('new_tab_checkbox').checked;
        var newWindowOption = document.getElementById('new_window_checkbox').checked;

        if (lang != "0") {
            browser.runtime.sendMessage({
                "data": lang,
                "engine": engine,
                "newTab": newTabOption,
                "newWindow": newWindowOption
            });
        }
    } else if (targetElement.id === "support_us") {
        browser.runtime.sendMessage({ type: "donation" });
    } else if (targetElement.id === "report_issue") {
        window.location.href = "mailto:hello@arradimohamed.fr";
    }
}

function saveOptions(e) {
    browser.storage.local.set({
        languageSaved: document.getElementById('data-language').value,
        engineSaved: document.getElementById('data-engine').value,
        newTabOption: document.getElementById('new_tab_checkbox').checked,
        newWindowOption: document.getElementById('new_window_checkbox').checked
    });
    e.preventDefault();
}

function restoreOptions() {

    document.getElementById('data-language').addEventListener("change", saveOptions);
    document.getElementById('data-engine').addEventListener("change", saveOptions);

    document.getElementById('new_window_checkbox').addEventListener('change', (event) => {
        if (event.target.checked) {
            document.getElementById('new_tab_checkbox').checked = false;
        }
        saveOptions()
    })
    document.getElementById('new_tab_checkbox').addEventListener('change', (event) => {
        if (event.target.checked) {
            document.getElementById('new_window_checkbox').checked = false;
        }
        saveOptions()
    })

    var gettingItem = browser.storage.local.get(['languageSaved', 'newTabOption', 'engineSaved', 'newWindowOption']);

    gettingItem.then((res) => {
        if (res.languageSaved !== undefined) {
            document.getElementById('data-language').value = res.languageSaved;
        }
        document.getElementById('new_tab_checkbox').checked = res.newTabOption;
        document.getElementById('data-engine').value = res.engineSaved;
        document.getElementById('new_window_checkbox').checked = res.newWindowOption;
    });
}

//// Window Listeners
window.addEventListener("click", notifyExtension);
window.addEventListener('DOMContentLoaded', restoreOptions);


