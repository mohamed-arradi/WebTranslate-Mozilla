///// Update HTML with Internationalisation
////////////////////////////////
if (browser.i18n.getUILanguage().includes("fr")) {
    browser.browserAction.setPopup({ popup: "../data/html/popup_menu-fr.html" });
} else {
    browser.browserAction.setPopup({ popup: "../data/html/popup_menu.html" });
}

var globalSelectedText = "";

const TranslatorEngine = {
    GOOGLE: 'google',
    BING: 'bing'
}
const ContextMenuId = {
    GeneralTranslate: 'general-translate',
    TextTranslate: 'text-translate'
}

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

    browser.storage.sync.set({ preferences });
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

function translateText(text) {
    var url = "https://translate.yandex.net/api/v1.5/tr.json/translate",
        keyAPI = "trnsl.1.1.20190701T182519Z.657c4fee9d3024f1.de4417e0b5a028b9a82682757192e007a8f10a6a";
    var xhr = new XMLHttpRequest();
    var gettingItem = browser.storage.local.get(['languageSaved']);
    gettingItem.then((res) => {
        let lang = res.languageSaved === undefined ? "en" : res.languageSaved;
        data = "key=" + keyAPI + "&text=" + text + "&lang=" + lang;
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var res = this.responseText;
                var json = JSON.parse(res);
                if (json.code == 200) {
                    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                        browser.tabs.sendMessage(tabs[0].id, {
                            translation: json.text[0]
                        }, function (response) { });
                    });
                }
            }
        }
    });
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

    browser.tabs.query({ currentWindow: true, active: true }).then(function (tabs) {
        let tab = tabs[0];
        if (tab !== null) {
            let endPoint = baseUrlEngine.replace("pageURL",
                encodeURI(clearedCurrentURL(translatorEngine, tab.url))).replace("languageTarget", lang);

            if (newWindow === true) {
                browser.windows.create({
                    url: [endPoint]
                });
            } else {
                if (newTab === false) {
                    browser.tabs.update({
                        url: endPoint
                    });
                } else {
                    browser.tabs.create({
                        url: endPoint
                    });
                }
            }
        }
    },
        function (error) {
            console.error(err);
        });
}

////// Create contextual Menu 
browser.contextMenus.create({
    id: ContextMenuId.GeneralTranslate,
    title: browser.i18n.getMessage("contextMenuItemTranslation"),
    contexts: ["all"]
});

browser.contextMenus.create({
    id: ContextMenuId.TextTranslate,
    title: browser.i18n.getMessage("contextMenuItemTextTranslation"),
    contexts: ["selection"]
});

////////// LISTENERS ////////////
////////////////////////////////

browser.contextMenus.onClicked.addListener(function (info, tab) {

    if (info.menuItemId == ContextMenuId.GeneralTranslate) {
        var gettingItem = browser.storage.local.get(['languageSaved', 'newTabOption', 'engineSaved', 'newWindowOption']);
        gettingItem.then((res) => {
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
            processContextData(pref, browser, false);
        });
    } else if (info.menuItemId == ContextMenuId.TextTranslate) {
        if (globalSelectedText !== undefined) {
            console.log(globalSelectedText);
            translateText(globalSelectedText);
        }
    }
});

browser.runtime.onMessage.addListener(function (data) {
    if (data.type === "text-copied") {
        globalSelectedText = data.selectedText;
    }
    else if (typeof data.type === 'undefined') {
        processInformation(data, browser, true);
    } else {
        browser.tabs.create({
            url: "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CK4Y594T6K5LL&source=url"
        });
    }
});


