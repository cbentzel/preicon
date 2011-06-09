function createPrerenderWatcher() {
    var wasPrerendered = false;
    function onChange() {
        if (document.webkitVisibilityState == "prerender") {
            wasPrerendered = true;
        }
        if (document.webkitVisibilityState == "visible") {
            if (wasPrerendered) {
                console.log("Now visible, was prerendered");
            } else {
                console.log("Now visible, not prerendered");
            }
            console.log("About to send request");
            chrome.extension.sendRequest({"prerender": wasPrerendered}, function(response) {});
        }
    }
    return onChange;
}

document.addEventListener("webkitvisibilitychange", createPrerenderWatcher(), false);
