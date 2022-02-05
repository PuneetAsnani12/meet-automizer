let AllowInput = document.getElementById("allowSwitch");
let DisAllowInput = document.getElementById("doNotAllowSwitch");

function setAutomizer(obj, obj_1, inverval_obj) {
    let interval = inverval_obj["a"]
    try {
        if (interval) {
            clearInterval(interval)
            interval = undefined;
        }
        if (obj["allow"]) {
            interval = setInterval(() => {
                if (document.getElementsByClassName('CwaK9').length > 0) {
                    let a = document.getElementsByClassName('CwaK9')[1]
                    a.click();
                }
            }, 2000)
        }
        else if (obj["do_not_allow"]) {
            interval = setInterval(() => {
                if (document.getElementsByClassName('CwaK9').length) {
                    let a = document.getElementsByClassName('CwaK9')[0]
                    a.click();
                }
            }, 2000)
        }
        chrome.storage.local.set(obj)
        chrome.storage.local.set(obj_1)
        chrome.storage.local.set({interval})
    } catch (err) {
        console.log(err)
    }
}
chrome.storage.local.get("allow",async ({ allow }) => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab.url.includes("https://meet.google.com")) {
        return
    }
    if (AllowInput)
        AllowInput.checked = allow
});

chrome.storage.local.get("do_not_allow", async({ do_not_allow }) => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab.url.includes("https://meet.google.com")) {
        return
    }
    if (DisAllowInput)
        DisAllowInput.checked = do_not_allow;
});




if (AllowInput) {
    AllowInput.addEventListener("change", async function (event) {
        try {
            let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (!tab.url.includes("https://meet.google.com")) {
                event.target.checked = false;
                return
            }

            DisAllowInput.checked = false
            let allow = {
                "allow": event.target.checked
            }
            let disallow = {
                "do_not_allow": false
            }
            chrome.storage.local.get("interval",async ({ interval }) => {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: setAutomizer,
                    args: [allow, disallow, { a: interval }]
                });
            });
           
        }
        catch (err) {
            console.log(err)
        }
    });
}

if (DisAllowInput) {
    DisAllowInput.addEventListener("change", async function (event) {
        try {
            let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (!tab.url.includes("https://meet.google.com")) {
                event.target.checked = false;
                return
            }
            AllowInput.checked = false
            let disallow = {
                "do_not_allow": event.target.checked
            }
            let allow = {
                "allow": false
            }
            chrome.storage.local.get("interval",async ({ interval }) => {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: setAutomizer,
                    args: [disallow, allow, { a: interval }]
                });
            });
           
        }
        catch (err) {
            console.log(err)
        }
    });
}