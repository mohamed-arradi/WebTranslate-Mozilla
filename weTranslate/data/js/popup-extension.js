'use strict';

function notifyExtension(event) {
    var targetElement = event.target || event.srcElement;
    if (targetElement.id === "translate_button") {
        var lang = document.getElementById('data-language').value;
        var engine = document.getElementById('data-engine').value;
        var newTabOption = document.getElementById('new_tab_checkbox').checked;

        if (lang != "0") {
            browser.runtime.sendMessage({
                "data": lang,
                "engine": engine,
                "newTab": newTabOption
            });
        }
    } else if (targetElement.id === "support_us") {
        browser.runtime.sendMessage({ type: "donation" });
    }
}

window.addEventListener("click", notifyExtension);

// var getting = browser.storage.sync.get("preferences");
// getting.then(function(pref) {

//     var preferences = pref;
//     var optionalData = JSON.parse(JSON.stringify(preferences));
//     console.log(JSON.stringify(preferences));
//     var lang = optionalData.preferences.lang;
//     var translatorEngine = optionalData.preferences.engine;
//     var newTab = optionalData.preferences.newTabOption;

//     if (typeof lang !== 'undefined' &&
//         typeof newTab !== 'undefined' &&
//         typeof translatorEngine !== 'undefined') {

//         console.log(lang);
//         document.getElementById('data-language').value = lang;
//         var selectOptions = document.getElementById('data-language');
//         var selectEngine = document.getElementById('data-engine');

//         var checkBoxOptions = document.getElementById('new_tab_checkbox');

//         if (newTab !== checkBoxOptions.checked) {
//             console.log("test click");
//             checkBoxOptions.click();
//         }

//         for (i = 0; i < selectOptions.length; i++) {
//             var value = selectOptions.options[i].value;
//             var index = selectOptions.options[i].index;
//             if (value === lang) {
//                 selectOptions.selectedIndex = index;
//                 break;
//             }
//         }
//         for (i = 0; i < selectEngine.length; i++) {
//             var value = selectEngine.options[i].value;
//             var index = selectEngine.options[i].index;

//             if (value === translatorEngine) {
//                 selectEngine.selectedIndex = index;
//                 break;
//             }
//         }
//     }
// }, function(error) {
//     console.log(error);
// });