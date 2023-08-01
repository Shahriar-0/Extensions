chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            function: () => {
                let links = Array.from(document.querySelectorAll("a"))
                    .map((a) => a.href)
                    .filter((href) => href.endsWith(".mkv") || href.endsWith(".mp4"));
                let linksStr = links.join("\n");

                let success = false;
                if (linksStr) {
                    let textarea = document.createElement("textarea");
                    textarea.value = linksStr;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand("copy");
                    document.body.removeChild(textarea);
                    success = true;
                }
                chrome.runtime.sendMessage({ success });
            },
        }
    );
});

chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.success) {
        chrome.action.setBadgeBackgroundColor({ color: "#0f0" });
        chrome.action.setBadgeText({ text: "✔️" });
    } else {
        chrome.action.setBadgeBackgroundColor({ color: "#f00" });
        chrome.action.setBadgeText({ text: "😞" });
    }
});
