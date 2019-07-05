
function addScript(srcLink) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.onload = function () {
        console.log("Script loaded and ready");
    };
    script.src = srcLink;
    document.getElementsByTagName('head')[0].appendChild(script);
}

function addStyleString(cssLink) {
    var node = document.createElement('style');
    node.type = 'text/css';
    node.src = cssLink;
    document.body.appendChild(node);
}
