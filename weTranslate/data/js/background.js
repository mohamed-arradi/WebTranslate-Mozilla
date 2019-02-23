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

browser.runtime.onMessage.addListener(function(data) {

    lang = data["data"];
    translatorEngine = data["engine"];

    var baseUrlEngine;

    if (translatorEngine === TranslatorEngine.GOOGLE) {
        baseUrlEngine = "https://translate.google.com/translate?hl=en&sl=auto&tl=languageTarget&u=pageURL";
    } else {
        baseUrlEngine = "https://www.microsofttranslator.com/bv.aspx?from=&to=languageTarget&a=pageURL";
    }
    browser.tabs.query({ currentWindow: true, active: true }).then(function(tabs) {
        let tab = tabs[0];
        if (tab !== null) {
            browser.tabs.update({
                url: baseUrlEngine.replace("pageURL",
                    encodeURI(clearedCurrentURL(translatorEngine, tab.url))).replace("languageTarget", lang)
            });
        }
    }, function(error) {
        console.error(err);
    });
});

///// Update HTML (Internationalisation)
if (browser.i18n.getUILanguage().includes("fr")) {
    browser.browserAction.setPopup({ popup: "./data/html/popup_menu-fr.html" });
} else {
    browser.browserAction.setPopup({ popup: "./data/html/popup_menu.html" });
}