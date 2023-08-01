chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
            let links = Array.from(document.querySelectorAll("a"))
                .map((a) => a.href)
                .filter((href) => href.endsWith(".mkv") || href.endsWith(".mp4"));
            let linksStr = links.join("\\n");
            return linksStr;
        }
    }, (results) => {
        let linksStr = results[0].result;
        if (linksStr) {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: (linksStr) => {
                    let textarea = document.createElement('textarea');
                    textarea.value = linksStr;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                },
                args: [linksStr]
            }, () => {
                chrome.action.setBadgeBackgroundColor({ color: "#0f0" });
                chrome.action.setBadgeText({ text: "✔️" });
            });
        } else {
            chrome.action.setBadgeBackgroundColor({ color: "#f00" });
            chrome.action.setBadgeText({ text: "😞" });
        }
    });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'copyLinks') {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: () => {
                    let links = Array.from(document.querySelectorAll("a"))
                        .map((a) => a.href)
                        .filter((href) => href.endsWith(".mkv") || href.endsWith(".mp4"));
                    let linksStr = links.join("\\n");
                    return linksStr;
                }
            }, (results) => {
                let linksStr = results[0].result;
                if (linksStr) {
                    chrome.scripting.executeScript({
                        target: { tabId: tabs[0].id },
                        function: (linksStr) => {
                            let textarea = document.createElement('textarea');
                            textarea.value = linksStr;
                            document.body.appendChild(textarea);
                            textarea.select();
                            document.execCommand('copy');
                            document.body.removeChild(textarea);
                        },
                        args: [linksStr]
                    }, () => {
                        sendResponse({ success: true });
                    });
                } else {
                    sendResponse({ success: false });
                }
            });
        });
    }
    return true;
});
