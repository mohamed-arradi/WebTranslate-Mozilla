const TranslatorEngine = {
    GOOGLE: 'google',
    BING: 'bing'
}

// function getBrowser() {
//     if (typeof chrome !== "undefined") {
//         if (typeof browser !== "undefined") {
//             return browser;
//         } else {
//             return chrome;
//         }
//     }
// }

function clearedCurrentURL(engine, currentURL) {

    var chainedTranslated;
    if (engine === "google") {
        chainedTranslated = currentURL.split("&u=");
    } else if (engine === "bing") {
        chainedTranslated = currentURL.split("&a=");
    }

    if (chainedTranslated === null || chainedTranslated.length == 0) {
        return currentURL;
    } else {
        return chainedTranslated[chainedTranslated.length - 1];
    }
}

function savePreferencesStorage(lang, engine, newTabOption, newWindowOption) {
    var preferences = {
        lang: lang,
        engine: engine,
        newTabOption: newTabOption,
        newWindowOption: newWindowOption
    }

    chrome.storage.sync.set({ preferences });
}

function processInformation(data, browser, savePreference) {
    lang = data["data"];
    translatorEngine = data["engine"];
    newTab = data["newTab"];
    newWindow = data['newWindow'];

    translate(lang, translatorEngine, newTab, newWindow, savePreference, browser);
}

function processContextData(data, browser, savePreference) {
    var lang = data.targetLang;
    var optionalData = JSON.parse(data.additionalData);
    var translatorEngine = optionalData.preferences.engine;
    var newTab = optionalData.preferences.newTabOption;
    var newWindow = optionalData.preferences.newWindow;

    translate(lang, translatorEngine, newTab, newWindow, savePreference, browser);
}

function translate(lang, translatorEngine, newTab, newWindow, savePreference, browser) {

    var baseUrlEngine;

    if (savePreference == true) {
        savePreferencesStorage(lang, translatorEngine, newTab, newWindow);
    }

    if (translatorEngine === TranslatorEngine.GOOGLE) {
        baseUrlEngine = "https://translate.google.com/translate?hl=en&sl=auto&tl=languageTarget&u=pageURL";
    } else {
        baseUrlEngine = "https://www.microsofttranslator.com/bv.aspx?from=&to=languageTarget&a=pageURL";
    }

    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        let tab = tabs[0];
        if (tab !== null) {
            let endPoint = baseUrlEngine.replace("pageURL",
                encodeURI(clearedCurrentURL(translatorEngine, tab.url))).replace("languageTarget", lang);

            if (newWindow === true) {
                chrome.windows.create({
                    url: [endPoint]
                });
            } else {
                if (newTab === false) {
                    chrome.tabs.update({
                        url: endPoint
                    });
                } else {
                    chrome.tabs.create({
                        url: endPoint
                    });
                }
            }
        }
    });
}

////// Create contextual Menu 
chrome.contextMenus.create({
    id: "translate-context",
    title: chrome.i18n.getMessage("contextMenuItemTranslation"),
    contexts: ["all"]
});

////////// LISTENERS ////////////
////////////////////////////////

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    chrome.storage.local.get(['languageSaved', 'newTabOption', 'engineSaved', 'newWindowOption'], function (res) {
        let lang = res.languageSaved === undefined ? "en" : res.languageSaved;
        let engine = res.engineSaved === undefined ? "google" : res.engineSaved;
        let newTabOption = res.newTabOption === undefined ? true : res.newTabOption;
        let newWindow = res.newWindowOption === undefined ? false : res.newWindowOption;

        var pref = {
            targetLang: lang,
            additionalData: JSON.stringify({
                "preferences": { "engine": engine, "newTabOption": newTabOption, "newWindow": newWindow }
            })
        };
        processContextData(pref, chrome, false);
    });
});

chrome.runtime.onMessage.addListener(function (data) {
    if (typeof data.type === 'undefined') {
        processInformation(data, chrome, true);
    } else {
        chrome.tabs.create({
            url: "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CK4Y594T6K5LL&source=url"
        });
    }
});

///// Update HTML with Internationalisation
////////////////////////////////
if (chrome.i18n.getUILanguage().includes("fr")) {
    chrome.browserAction.setPopup({ popup: "../data/html/popup_menu-fr.html" });
} else {
    chrome.browserAction.setPopup({ popup: "../data/html/popup_menu.html" });
}