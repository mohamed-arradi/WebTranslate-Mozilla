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
});

///// Update HTML (Internationalisation)
if (browser.i18n.getUILanguage().includes("fr")) {
    browser.browserAction.setPopup({ popup: "./data/html/popup_menu-fr.html" });
} else {
    browser.browserAction.setPopup({ popup: "./data/html/popup_menu.html" });
}


//// Contextual Menu
browser.contextMenus.create({
    id: "translate-page-contextual",
    title: "Translate Page", //browser.i18n.getMessage("contextMenuItemSelectionLogger"),
    contexts: ["all"],
    icons: {
        "16": "/images/weTranslate16.png",
        "32": "/images/weTranslate32.png"
    }
});


browser.contextMenus.onClicked.addListener(function(info, tab) {
    switch (info.menuItemId) {
        case "translate-page-contextual":
            console.log(info.selectionText);
            break;
    }
})