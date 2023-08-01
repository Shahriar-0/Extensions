chrome.browserAction.onClicked.addListener(tab => {
    chrome.tabs.executeScript(tab.id, {
        code: `
            let links = Array.from(document.querySelectorAll('a'))
                .map(a => a.href)
                .filter(href => href.endsWith('.mkv') || href.endsWith('.mp4'));
            let linksStr = links.join('\\n');

            let textarea = document.createElement('textarea');
            textarea.value = linksStr;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        `
    });
});
