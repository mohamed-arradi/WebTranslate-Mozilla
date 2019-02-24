import { languagesResources } from 'resources';

const TranslatorEngine = {
        GOOGLE: 'google',
        BING: 'bing',
    }
    //avoid multiple chained translation
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

function translate(data, browser) {
    lang = data["data"];
    translatorEngine = data["engine"];
    newTab = data["newTab"];
    var baseUrlEngine;

    if (translatorEngine === TranslatorEngine.GOOGLE) {
        baseUrlEngine = "https://translate.google.com/translate?hl=en&sl=auto&tl=languageTarget&u=pageURL";
    } else {
        baseUrlEngine = "https://www.microsofttranslator.com/bv.aspx?from=&to=languageTarget&a=pageURL";
    }

    browser.tabs.query({ currentWindow: true, active: true }).then(function(tabs) {
            let tab = tabs[0];
            if (tab !== null) {
                let endPoint = baseUrlEngine.replace("pageURL",
                    encodeURI(clearedCurrentURL(translatorEngine, tab.url))).replace("languageTarget", lang);
                if (newTab === false) {
                    browser.tabs.update({
                        url: endPoint
                    });
                } else {
                    browser.tabs.create({
                        url: endPoint
                    });
                    creating.then(function(tab) {}, function(error) {});
                }
            }
        },
        function(error) {
            console.error(err);
        });
}

browser.runtime.onMessage.addListener(function(data) {
    translate(data, browser);
});

///// Update HTML (Internationalisation)
if (browser.i18n.getUILanguage().includes("fr")) {
    browser.browserAction.setPopup({ popup: "./data/html/popup_menu-fr.html" });
} else {
    browser.browserAction.setPopup({ popup: "./data/html/popup_menu.html" });
}

var fileToUseForLanguage = browser.i18n.getUILanguage().includes("fr") ? languagesResources("fr") : languagesResources("en");
var dataJson = JSON.parse(frLanguageJSON);

for (key in dataJson) {
    browser.contextMenus.create({
        id: dataJson[key]["language"],
        title: dataJson[key]["name"],
        type: "checkbox",
        contexts: ["all"]
    });
}

browser.contextMenus.onClicked.addListener(function(info, tab) {
    //info.menuItemId
    //translate(data,browser);
});