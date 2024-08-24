// Background script to handle download and renaming
chrome.runtime.onMessage.addListener((message) => {
    if (message.pdfLink && message.title) {
        const url = `https://arxiv.org${message.pdfLink}`;
        const filename = `${message.title}.pdf`;

        // Download the PDF
        chrome.downloads.download({
            url: url,
            filename: filename,
            conflictAction: "uniquify" // Handle filename conflicts
        });
    }
});
