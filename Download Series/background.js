let category = 'movies';
let fileTypes = ['mkv'];
let regexPattern = ''; 

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'setCategory') {
        category = message.category;
    } else if (message.action === 'setFileTypes') {
        fileTypes = message.fileTypes;
    } else if (message.action === 'setRegexPattern') {
        regexPattern = message.regexPattern;
    } else if (message.action === 'copyLinks') {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: (category, fileTypes, regexPattern) => { 
                    let links = Array.from(document.querySelectorAll("a"))
                        .map((a) => a.href)
                        .filter((href) => {
                            let regex = new RegExp(regexPattern);
                            return fileTypes.some((fileType) => href.endsWith("." + fileType)) && regex.test(href);
                        });
                    let linksStr = links.join("\n");
                    return linksStr;
                },
                args: [category, fileTypes, regexPattern]
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
