const DEFAULT_BASE_URL = "http://www.library.drexel.edu/cgi-bin/r.cgi?url=$@";

function transformUrl(url) {
    localStorage[Date()] = url;
    var base = localStorage["base_url"];
    if (!base) {
        base = localStorage["base_url"] = DEFAULT_BASE_URL;
    }

    if (base.indexOf("$@") >= 0) {
        return base.replace("$@", url);
    }
    return base;
}

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.update(tab.id, {"url": transformUrl(tab.url)});
});

chrome.contextMenus.create({
    "title": "Open Link with EZProxy",
    "contexts": ["link"],
    "onclick": function(info, tab) {
        chrome.tabs.create({"url": transformUrl(info.linkUrl)});
    }
});
