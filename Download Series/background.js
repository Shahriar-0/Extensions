chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'copyLinks') {
        chrome.tabs.executeScript({
            code: `
                let links = Array.from(document.querySelectorAll('a'))
                    .map(a => a.href)
                    .filter(href => href.endsWith('.mkv') || href.endsWith('.mp4'));
                let linksStr = links.join('\\n');

                let success = false;
                if (linksStr) {
                    let textarea = document.createElement('textarea');
                    textarea.value = linksStr;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                    success = true;
                }
                success
            `
        }, results => {
            sendResponse({ success: results[0] });
        });
        return true;
    }
});
