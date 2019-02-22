const TranslatorEngine = {
    GOOGLE: 'google',
    BING: 'bing',
}
browser.runtime.onMessage.addListener(function(data) {

    lang = data["data"];
    currentUrl = data["current_url"];
    translatorEngine = data["engine"];

    var baseUrlEngine;

    if (translatorEngine === TranslatorEngine.GOOGLE) {
        baseUrlEngine = "https://translate.google.com/translate?hl=en&sl=auto&tl=languageTarget&u=pageURL";
    } else {
        baseUrlEngine = "https://www.microsofttranslator.com/bv.aspx?from=&to=languageTarget&a=pageURL";
    }
    browser.tabs.query({ currentWindow: true, active: true }).then(function(tabs) {
        let tab = tabs[0];
        if (tab !== null && currentUrl !== null) {
            browser.tabs.update({
                url: baseUrlEngine.replace("pageURL",
                    encodeURI(tab.url)).replace("languageTarget", lang)
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