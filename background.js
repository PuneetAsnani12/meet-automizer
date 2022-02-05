chrome.webNavigation.onCompleted.addListener(function () {
    chrome.storage.local.set({ "allow": false });
    chrome.storage.local.set({ "do_not_allow": false });
}, {
    url: [{
        hostContains: 'meet.google.com'
    }],
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ "allow": false });
    chrome.storage.local.set({ "do_not_allow": false });
    chrome.storage.local.set({ "interval": undefined });
});
