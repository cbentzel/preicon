function createPrerenderWatcher() {
    function isPrerendered() {
        return document.webkitVisibilityState == "prerender";
    }
    function isVisible() {
        return document.webkitVisibilityState == "visible";
    }
    var wasPrerendered = isPrerendered();
    function onChange() {
        if (isPrerendered()) {
            wasPrerendered = true;
        }
        if (isVisible() && wasPrerendered) {
            chrome.extension.sendRequest({}, function(response) {});
        }
    }
    return onChange;
}

document.addEventListener("webkitvisibilitychange", createPrerenderWatcher(), false);
