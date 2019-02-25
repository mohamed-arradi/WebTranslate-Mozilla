const TranslatorEngine = {
        GOOGLE: 'google',
        BING: 'bing'
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

function savePreferencesStorage(lang, engine, newTabOption) {

    var preferences = {
        lang: lang,
        engine: engine,
        newTabOption: newTabOption
    }

    browser.storage.sync.set({ preferences });
}

function processInformation(data, browser, savePreference) {
    lang = data["data"];
    translatorEngine = data["engine"];
    newTab = data["newTab"];

    translate(lang, translatorEngine, newTab, savePreference, browser);
}


function processContextData(data, browser, savePreference) {

    console.log(data);
    var lang = data.targetLang;
    console.log(lang);
    //var translatorEngine = data["engine"];
    // newTab = data["newTab"];

    // translate(lang, translatorEngine, newTab, savePreference, browser);
}

function translate(lang, translatorEngine, newTab, savePreference, browser) {
  
    var baseUrlEngine;

    if (savePreference == true) {
        savePreferencesStorage(lang, translatorEngine, newTab);
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
            if (newTab === false) {
                browser.tabs.update({
                    url: endPoint
                });
            } else {
                browser.tabs.create({
                    url: endPoint
                });
                creating.then(function (tab) { }, function (error) { });
            }
        }
    },
        function (error) {
            console.error(err);
        });
}

browser.runtime.onMessage.addListener(function(data) {
    processInformation(data, browser, true);
});

///// Update HTML (Internationalisation)
if (browser.i18n.getUILanguage().includes("fr")) {
    browser.browserAction.setPopup({ popup: "../data/html/popup_menu-fr.html" });
} else {
    browser.browserAction.setPopup({ popup: "../data/html/popup_menu.html" });
}

let frJson = "[\r\n    {\r\n        \"language\": \"en\",\r\n        \"name\": \"Anglais\"\r\n    },\r\n    {\r\n        \"language\": \"af\",\r\n        \"name\": \"Afrikaans\"\r\n    },\r\n    {\r\n        \"language\": \"sq\",\r\n        \"name\": \"albanais\"\r\n    },\r\n    {\r\n        \"language\": \"am\",\r\n        \"name\": \"Amharique\"\r\n    },\r\n    {\r\n        \"language\": \"ar\",\r\n        \"name\": \"Arabe\"\r\n    },\r\n    {\r\n        \"language\": \"hy\",\r\n        \"name\": \"Arm\u00E9nien\"\r\n    },\r\n    {\r\n        \"language\": \"az\",\r\n        \"name\": \"Azerba\u00EFdjanais\"\r\n    },\r\n    {\r\n        \"language\": \"eu\",\r\n        \"name\": \"Basque\"\r\n    },\r\n    {\r\n        \"language\": \"be\",\r\n        \"name\": \"Bi\u00E9lorusse\"\r\n    },\r\n    {\r\n        \"language\": \"bn\",\r\n        \"name\": \"Bengali\"\r\n    },\r\n    {\r\n        \"language\": \"bs\",\r\n        \"name\": \"Bosniaque\"\r\n    },\r\n    {\r\n        \"language\": \"bg\",\r\n        \"name\": \"Bulgare\"\r\n    },\r\n    {\r\n        \"language\": \"ca\",\r\n        \"name\": \"Catalan\"\r\n    },\r\n    {\r\n        \"language\": \"ceb\",\r\n        \"name\": \"Cebuano\"\r\n    },\r\n    {\r\n        \"language\": \"ny\",\r\n        \"name\": \"Chichewa\"\r\n    },\r\n    {\r\n        \"language\": \"zh\",\r\n        \"name\": \"Chinois (Simplifi\u00E9)\"\r\n    },\r\n    {\r\n        \"language\": \"zh-TW\",\r\n        \"name\": \"Chinois (Traditionnel)\"\r\n    },\r\n    {\r\n        \"language\": \"co\",\r\n        \"name\": \"Corse\"\r\n    },\r\n    {\r\n        \"language\": \"hr\",\r\n        \"name\": \"Croate\"\r\n    },\r\n    {\r\n        \"language\": \"cs\",\r\n        \"name\": \"Tch\u00E8que\"\r\n    },\r\n    {\r\n        \"language\": \"da\",\r\n        \"name\": \"Danois\"\r\n    },\r\n    {\r\n        \"language\": \"nl\",\r\n        \"name\": \"N\u00E9erlandais\"\r\n    },\r\n    {\r\n        \"language\": \"eo\",\r\n        \"name\": \"Esp\u00E9ranto\"\r\n    },\r\n    {\r\n        \"language\": \"et\",\r\n        \"name\": \"Estonien\"\r\n    },\r\n    {\r\n        \"language\": \"tl\",\r\n        \"name\": \"Philippin\"\r\n    },\r\n    {\r\n        \"language\": \"fi\",\r\n        \"name\": \"Finlandais\"\r\n    },\r\n    {\r\n        \"language\": \"fr\",\r\n        \"name\": \"Fran\u00E7ais\"\r\n    },\r\n    {\r\n        \"language\": \"fy\",\r\n        \"name\": \"Frison\"\r\n    },\r\n    {\r\n        \"language\": \"gl\",\r\n        \"name\": \"Galicien\"\r\n    },\r\n    {\r\n        \"language\": \"ka\",\r\n        \"name\": \"G\u00E9orgien\"\r\n    },\r\n    {\r\n        \"language\": \"de\",\r\n        \"name\": \"Allemand\"\r\n    },\r\n    {\r\n        \"language\": \"el\",\r\n        \"name\": \"Grec\"\r\n    },\r\n    {\r\n        \"language\": \"gu\",\r\n        \"name\": \"Gujarati\"\r\n    },\r\n    {\r\n        \"language\": \"ht\",\r\n        \"name\": \"Cr\u00E9ole ha\u00EFtien\"\r\n    },\r\n    {\r\n        \"language\": \"ha\",\r\n        \"name\": \"Hausa\"\r\n    },\r\n    {\r\n        \"language\": \"haw\",\r\n        \"name\": \"Hawa\u00EFen\"\r\n    },\r\n    {\r\n        \"language\": \"iw\",\r\n        \"name\": \"H\u00E9breu\"\r\n    },\r\n    {\r\n        \"language\": \"hi\",\r\n        \"name\": \"Hindi\"\r\n    },\r\n    {\r\n        \"language\": \"hmn\",\r\n        \"name\": \"Hmong\"\r\n    },\r\n    {\r\n        \"language\": \"hu\",\r\n        \"name\": \"Hongrois\"\r\n    },\r\n    {\r\n        \"language\": \"is\",\r\n        \"name\": \"Islandais\"\r\n    },\r\n    {\r\n        \"language\": \"ig\",\r\n        \"name\": \"Igbo\"\r\n    },\r\n    {\r\n        \"language\": \"id\",\r\n        \"name\": \"Indon\u00E9sien\"\r\n    },\r\n    {\r\n        \"language\": \"ga\",\r\n        \"name\": \"Irlandais\"\r\n    },\r\n    {\r\n        \"language\": \"it\",\r\n        \"name\": \"Italien\"\r\n    },\r\n    {\r\n        \"language\": \"ja\",\r\n        \"name\": \"Japonais\"\r\n    },\r\n    {\r\n        \"language\": \"jw\",\r\n        \"name\": \"Javanais\"\r\n    },\r\n    {\r\n        \"language\": \"kn\",\r\n        \"name\": \"Kannada\"\r\n    },\r\n    {\r\n        \"language\": \"kk\",\r\n        \"name\": \"Kazakh\"\r\n    },\r\n    {\r\n        \"language\": \"km\",\r\n        \"name\": \"Khmer\"\r\n    },\r\n    {\r\n        \"language\": \"ko\",\r\n        \"name\": \"Cor\u00E9en\"\r\n    },\r\n    {\r\n        \"language\": \"ku\",\r\n        \"name\": \"Kurde\"\r\n    },\r\n    {\r\n        \"language\": \"ky\",\r\n        \"name\": \"Kyrgyz\"\r\n    },\r\n    {\r\n        \"language\": \"lo\",\r\n        \"name\": \"Lao\"\r\n    },\r\n    {\r\n        \"language\": \"la\",\r\n        \"name\": \"Latin\"\r\n    },\r\n    {\r\n        \"language\": \"lv\",\r\n        \"name\": \"Letton\"\r\n    },\r\n    {\r\n        \"language\": \"lt\",\r\n        \"name\": \"Lituanien\"\r\n    },\r\n    {\r\n        \"language\": \"lb\",\r\n        \"name\": \"Luxembourgeois\"\r\n    },\r\n    {\r\n        \"language\": \"mk\",\r\n        \"name\": \"Mac\u00E9donien\"\r\n    },\r\n    {\r\n        \"language\": \"mg\",\r\n        \"name\": \"Malgache\"\r\n    },\r\n    {\r\n        \"language\": \"ms\",\r\n        \"name\": \"Malais\"\r\n    },\r\n    {\r\n        \"language\": \"ml\",\r\n        \"name\": \"Malayalam\"\r\n    },\r\n    {\r\n        \"language\": \"mt\",\r\n        \"name\": \"Maltais\"\r\n    },\r\n    {\r\n        \"language\": \"mi\",\r\n        \"name\": \"Maori\"\r\n    },\r\n    {\r\n        \"language\": \"mr\",\r\n        \"name\": \"Marathi\"\r\n    },\r\n    {\r\n        \"language\": \"mn\",\r\n        \"name\": \"Mongol\"\r\n    },\r\n    {\r\n        \"language\": \"my\",\r\n        \"name\": \"Myanmar (Birman)\"\r\n    },\r\n    {\r\n        \"language\": \"ne\",\r\n        \"name\": \"N\u00E9palais\"\r\n    },\r\n    {\r\n        \"language\": \"no\",\r\n        \"name\": \"Norv\u00E9gien\"\r\n    },\r\n    {\r\n        \"language\": \"ps\",\r\n        \"name\": \"Pachto\"\r\n    },\r\n    {\r\n        \"language\": \"fa\",\r\n        \"name\": \"Persan\"\r\n    },\r\n    {\r\n        \"language\": \"pl\",\r\n        \"name\": \"Polonais\"\r\n    },\r\n    {\r\n        \"language\": \"pt\",\r\n        \"name\": \"Portugais\"\r\n    },\r\n    {\r\n        \"language\": \"pa\",\r\n        \"name\": \"Punjabi\"\r\n    },\r\n    {\r\n        \"language\": \"ro\",\r\n        \"name\": \"Roumain\"\r\n    },\r\n    {\r\n        \"language\": \"ru\",\r\n        \"name\": \"Russe\"\r\n    },\r\n    {\r\n        \"language\": \"sm\",\r\n        \"name\": \"Samoan\"\r\n    },\r\n    {\r\n        \"language\": \"gd\",\r\n        \"name\": \"Ga\u00E9lique \u00E9cossais\"\r\n    },\r\n    {\r\n        \"language\": \"sr\",\r\n        \"name\": \"Serbe\"\r\n    },\r\n    {\r\n        \"language\": \"st\",\r\n        \"name\": \"Sesotho\"\r\n    },\r\n    {\r\n        \"language\": \"sn\",\r\n        \"name\": \"Shona\"\r\n    },\r\n    {\r\n        \"language\": \"sd\",\r\n        \"name\": \"Sindhi\"\r\n    },\r\n    {\r\n        \"language\": \"si\",\r\n        \"name\": \"Sinhala\"\r\n    },\r\n    {\r\n        \"language\": \"sk\",\r\n        \"name\": \"Slovaque\"\r\n    },\r\n    {\r\n        \"language\": \"sl\",\r\n        \"name\": \"Slov\u00E8ne\"\r\n    },\r\n    {\r\n        \"language\": \"so\",\r\n        \"name\": \"Somali\"\r\n    },\r\n    {\r\n        \"language\": \"es\",\r\n        \"name\": \"Espanol\"\r\n    },\r\n    {\r\n        \"language\": \"su\",\r\n        \"name\": \"Sundanese\"\r\n    },\r\n    {\r\n        \"language\": \"sw\",\r\n        \"name\": \"Swahili\"\r\n    },\r\n    {\r\n        \"language\": \"sv\",\r\n        \"name\": \"Su\u00E9dois\"\r\n    },\r\n    {\r\n        \"language\": \"tg\",\r\n        \"name\": \"Tajik\"\r\n    },\r\n    {\r\n        \"language\": \"ta\",\r\n        \"name\": \"Tamil\"\r\n    },\r\n    {\r\n        \"language\": \"te\",\r\n        \"name\": \"Telugu\"\r\n    },\r\n    {\r\n        \"language\": \"th\",\r\n        \"name\": \"Tha\u00EFlandais\"\r\n    },\r\n    {\r\n        \"language\": \"tr\",\r\n        \"name\": \"Turc\"\r\n    },\r\n    {\r\n        \"language\": \"uk\",\r\n        \"name\": \"Ukrainien\"\r\n    },\r\n    {\r\n        \"language\": \"ur\",\r\n        \"name\": \"Urdu\"\r\n    },\r\n    {\r\n        \"language\": \"uz\",\r\n        \"name\": \"Uzbek\"\r\n    },\r\n    {\r\n        \"language\": \"vi\",\r\n        \"name\": \"Vietnamien\"\r\n    },\r\n    {\r\n        \"language\": \"cy\",\r\n        \"name\": \"Welsh\"\r\n    },\r\n    {\r\n        \"language\": \"xh\",\r\n        \"name\": \"Xhosa\"\r\n    },\r\n    {\r\n        \"language\": \"yi\",\r\n        \"name\": \"Yiddish\"\r\n    },\r\n    {\r\n        \"language\": \"yo\",\r\n        \"name\": \"Yoruba\"\r\n    },\r\n    {\r\n        \"language\": \"zu\",\r\n        \"name\": \"Zulu\"\r\n    }\r\n]\r\n";

let enJson = "[\r\n    {\r\n        \"language\": \"en\",\r\n        \"name\": \"English\"\r\n    },\r\n            {\r\n                \"language\": \"af\",\r\n                \"name\": \"Afrikaans\"\r\n            },\r\n            {\r\n                \"language\": \"sq\",\r\n                \"name\": \"Albanian\"\r\n            },\r\n            {\r\n                \"language\": \"am\",\r\n                \"name\": \"Amharic\"\r\n            },\r\n            {\r\n                \"language\": \"ar\",\r\n                \"name\": \"Arabic\"\r\n            },\r\n            {\r\n                \"language\": \"hy\",\r\n                \"name\": \"Armenian\"\r\n            },\r\n            {\r\n                \"language\": \"az\",\r\n                \"name\": \"Azerbaijani\"\r\n            },\r\n            {\r\n                \"language\": \"eu\",\r\n                \"name\": \"Basque\"\r\n            },\r\n            {\r\n                \"language\": \"be\",\r\n                \"name\": \"Belarusian\"\r\n            },\r\n            {\r\n                \"language\": \"bn\",\r\n                \"name\": \"Bengali\"\r\n            },\r\n            {\r\n                \"language\": \"bs\",\r\n                \"name\": \"Bosnian\"\r\n            },\r\n            {\r\n                \"language\": \"bg\",\r\n                \"name\": \"Bulgarian\"\r\n            },\r\n            {\r\n                \"language\": \"ca\",\r\n                \"name\": \"Catalan\"\r\n            },\r\n            {\r\n                \"language\": \"ceb\",\r\n                \"name\": \"Cebuano\"\r\n            },\r\n            {\r\n                \"language\": \"ny\",\r\n                \"name\": \"Chichewa\"\r\n            },\r\n            {\r\n                \"language\": \"zh\",\r\n                \"name\": \"Chinese (Simplified)\"\r\n            },\r\n            {\r\n                \"language\": \"zh-TW\",\r\n                \"name\": \"Chinese (Traditional)\"\r\n            },\r\n            {\r\n                \"language\": \"co\",\r\n                \"name\": \"Corsican\"\r\n            },\r\n            {\r\n                \"language\": \"hr\",\r\n                \"name\": \"Croatian\"\r\n            },\r\n            {\r\n                \"language\": \"cs\",\r\n                \"name\": \"Czech\"\r\n            },\r\n            {\r\n                \"language\": \"da\",\r\n                \"name\": \"Danish\"\r\n            },\r\n            {\r\n                \"language\": \"nl\",\r\n                \"name\": \"Dutch\"\r\n            },\r\n            {\r\n                \"language\": \"eo\",\r\n                \"name\": \"Esperanto\"\r\n            },\r\n            {\r\n                \"language\": \"et\",\r\n                \"name\": \"Estonian\"\r\n            },\r\n            {\r\n                \"language\": \"tl\",\r\n                \"name\": \"Filipino\"\r\n            },\r\n            {\r\n                \"language\": \"fi\",\r\n                \"name\": \"Finnish\"\r\n            },\r\n            {\r\n                \"language\": \"fr\",\r\n                \"name\": \"French\"\r\n            },\r\n            {\r\n                \"language\": \"fy\",\r\n                \"name\": \"Frisian\"\r\n            },\r\n            {\r\n                \"language\": \"gl\",\r\n                \"name\": \"Galician\"\r\n            },\r\n            {\r\n                \"language\": \"ka\",\r\n                \"name\": \"Georgian\"\r\n            },\r\n            {\r\n                \"language\": \"de\",\r\n                \"name\": \"German\"\r\n            },\r\n            {\r\n                \"language\": \"el\",\r\n                \"name\": \"Greek\"\r\n            },\r\n            {\r\n                \"language\": \"gu\",\r\n                \"name\": \"Gujarati\"\r\n            },\r\n            {\r\n                \"language\": \"ht\",\r\n                \"name\": \"Haitian Creole\"\r\n            },\r\n            {\r\n                \"language\": \"ha\",\r\n                \"name\": \"Hausa\"\r\n            },\r\n            {\r\n                \"language\": \"haw\",\r\n                \"name\": \"Hawaiian\"\r\n            },\r\n            {\r\n                \"language\": \"iw\",\r\n                \"name\": \"Hebrew\"\r\n            },\r\n            {\r\n                \"language\": \"hi\",\r\n                \"name\": \"Hindi\"\r\n            },\r\n            {\r\n                \"language\": \"hmn\",\r\n                \"name\": \"Hmong\"\r\n            },\r\n            {\r\n                \"language\": \"hu\",\r\n                \"name\": \"Hungarian\"\r\n            },\r\n            {\r\n                \"language\": \"is\",\r\n                \"name\": \"Icelandic\"\r\n            },\r\n            {\r\n                \"language\": \"ig\",\r\n                \"name\": \"Igbo\"\r\n            },\r\n            {\r\n                \"language\": \"id\",\r\n                \"name\": \"Indonesian\"\r\n            },\r\n            {\r\n                \"language\": \"ga\",\r\n                \"name\": \"Irish\"\r\n            },\r\n            {\r\n                \"language\": \"it\",\r\n                \"name\": \"Italian\"\r\n            },\r\n            {\r\n                \"language\": \"ja\",\r\n                \"name\": \"Japanese\"\r\n            },\r\n            {\r\n                \"language\": \"jw\",\r\n                \"name\": \"Javanese\"\r\n            },\r\n            {\r\n                \"language\": \"kn\",\r\n                \"name\": \"Kannada\"\r\n            },\r\n            {\r\n                \"language\": \"kk\",\r\n                \"name\": \"Kazakh\"\r\n            },\r\n            {\r\n                \"language\": \"km\",\r\n                \"name\": \"Khmer\"\r\n            },\r\n            {\r\n                \"language\": \"ko\",\r\n                \"name\": \"Korean\"\r\n            },\r\n            {\r\n                \"language\": \"ku\",\r\n                \"name\": \"Kurdish (Kurmanji)\"\r\n            },\r\n            {\r\n                \"language\": \"ky\",\r\n                \"name\": \"Kyrgyz\"\r\n            },\r\n            {\r\n                \"language\": \"lo\",\r\n                \"name\": \"Lao\"\r\n            },\r\n            {\r\n                \"language\": \"la\",\r\n                \"name\": \"Latin\"\r\n            },\r\n            {\r\n                \"language\": \"lv\",\r\n                \"name\": \"Latvian\"\r\n            },\r\n            {\r\n                \"language\": \"lt\",\r\n                \"name\": \"Lithuanian\"\r\n            },\r\n            {\r\n                \"language\": \"lb\",\r\n                \"name\": \"Luxembourgish\"\r\n            },\r\n            {\r\n                \"language\": \"mk\",\r\n                \"name\": \"Macedonian\"\r\n            },\r\n            {\r\n                \"language\": \"mg\",\r\n                \"name\": \"Malagasy\"\r\n            },\r\n            {\r\n                \"language\": \"ms\",\r\n                \"name\": \"Malay\"\r\n            },\r\n            {\r\n                \"language\": \"ml\",\r\n                \"name\": \"Malayalam\"\r\n            },\r\n            {\r\n                \"language\": \"mt\",\r\n                \"name\": \"Maltese\"\r\n            },\r\n            {\r\n                \"language\": \"mi\",\r\n                \"name\": \"Maori\"\r\n            },\r\n            {\r\n                \"language\": \"mr\",\r\n                \"name\": \"Marathi\"\r\n            },\r\n            {\r\n                \"language\": \"mn\",\r\n                \"name\": \"Mongolian\"\r\n            },\r\n            {\r\n                \"language\": \"my\",\r\n                \"name\": \"Myanmar (Burmese)\"\r\n            },\r\n            {\r\n                \"language\": \"ne\",\r\n                \"name\": \"Nepali\"\r\n            },\r\n            {\r\n                \"language\": \"no\",\r\n                \"name\": \"Norwegian\"\r\n            },\r\n            {\r\n                \"language\": \"ps\",\r\n                \"name\": \"Pashto\"\r\n            },\r\n            {\r\n                \"language\": \"fa\",\r\n                \"name\": \"Persian\"\r\n            },\r\n            {\r\n                \"language\": \"pl\",\r\n                \"name\": \"Polish\"\r\n            },\r\n            {\r\n                \"language\": \"pt\",\r\n                \"name\": \"Portuguese\"\r\n            },\r\n            {\r\n                \"language\": \"pa\",\r\n                \"name\": \"Punjabi\"\r\n            },\r\n            {\r\n                \"language\": \"ro\",\r\n                \"name\": \"Romanian\"\r\n            },\r\n            {\r\n                \"language\": \"ru\",\r\n                \"name\": \"Russian\"\r\n            },\r\n            {\r\n                \"language\": \"sm\",\r\n                \"name\": \"Samoan\"\r\n            },\r\n            {\r\n                \"language\": \"gd\",\r\n                \"name\": \"Scots Gaelic\"\r\n            },\r\n            {\r\n                \"language\": \"sr\",\r\n                \"name\": \"Serbian\"\r\n            },\r\n            {\r\n                \"language\": \"st\",\r\n                \"name\": \"Sesotho\"\r\n            },\r\n            {\r\n                \"language\": \"sn\",\r\n                \"name\": \"Shona\"\r\n            },\r\n            {\r\n                \"language\": \"sd\",\r\n                \"name\": \"Sindhi\"\r\n            },\r\n            {\r\n                \"language\": \"si\",\r\n                \"name\": \"Sinhala\"\r\n            },\r\n            {\r\n                \"language\": \"sk\",\r\n                \"name\": \"Slovak\"\r\n            },\r\n            {\r\n                \"language\": \"sl\",\r\n                \"name\": \"Slovenian\"\r\n            },\r\n            {\r\n                \"language\": \"so\",\r\n                \"name\": \"Somali\"\r\n            },\r\n            {\r\n                \"language\": \"es\",\r\n                \"name\": \"Spanish\"\r\n            },\r\n            {\r\n                \"language\": \"su\",\r\n                \"name\": \"Sundanese\"\r\n            },\r\n            {\r\n                \"language\": \"sw\",\r\n                \"name\": \"Swahili\"\r\n            },\r\n            {\r\n                \"language\": \"sv\",\r\n                \"name\": \"Swedish\"\r\n            },\r\n            {\r\n                \"language\": \"tg\",\r\n                \"name\": \"Tajik\"\r\n            },\r\n            {\r\n                \"language\": \"ta\",\r\n                \"name\": \"Tamil\"\r\n            },\r\n            {\r\n                \"language\": \"te\",\r\n                \"name\": \"Telugu\"\r\n            },\r\n            {\r\n                \"language\": \"th\",\r\n                \"name\": \"Thai\"\r\n            },\r\n            {\r\n                \"language\": \"tr\",\r\n                \"name\": \"Turkish\"\r\n            },\r\n            {\r\n                \"language\": \"uk\",\r\n                \"name\": \"Ukrainian\"\r\n            },\r\n            {\r\n                \"language\": \"ur\",\r\n                \"name\": \"Urdu\"\r\n            },\r\n            {\r\n                \"language\": \"uz\",\r\n                \"name\": \"Uzbek\"\r\n            },\r\n            {\r\n                \"language\": \"vi\",\r\n                \"name\": \"Vietnamese\"\r\n            },\r\n            {\r\n                \"language\": \"cy\",\r\n                \"name\": \"Welsh\"\r\n            },\r\n            {\r\n                \"language\": \"xh\",\r\n                \"name\": \"Xhosa\"\r\n            },\r\n            {\r\n                \"language\": \"yi\",\r\n                \"name\": \"Yiddish\"\r\n            },\r\n            {\r\n                \"language\": \"yo\",\r\n                \"name\": \"Yoruba\"\r\n            },\r\n            {\r\n                \"language\": \"zu\",\r\n                \"name\": \"Zulu\"\r\n            }\r\n        ]\r\n";

let dataJson = JSON.parse(browser.i18n.getUILanguage().includes("fr") ? frJson : enJson);

for (key in dataJson) {
    browser.contextMenus.create({
        id: dataJson[key]["language"],
        title: dataJson[key]["name"],
        contexts: ["all"]
    });
}

browser.contextMenus.onClicked.addListener(function(info, tab) {

    var getting = browser.storage.sync.get("preferences");

    getting.then(function(preferences) {
        console.log(preferences);
        
        var pref = {
            targetLang: info.menuItemId,
            additionalData: JSON.stringify(preferences)
        };
        processContextData(pref,browser,false);
    }, function(error) {
        let data = {
            "data": info.menuItemId,
            "engine": GOOGLE,
            "newTab": false
        };
        translate(data, browser, false);
    });
});