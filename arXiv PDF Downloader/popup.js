// Function to extract and send data to background script
function extractData() {
    // Get PDF link
    const pdfLinkElement = document.querySelector("a.download-pdf");
    if (!pdfLinkElement) {
        console.error("PDF download link not found");
        return;
    }
    const pdfLink = pdfLinkElement.getAttribute("href");

    // Get title
    const titleElement = document.querySelector("h1.title.mathjax");
    if (!titleElement) {
        console.error("Title element not found");
        return;
    }
    // remove word before the only the first ":"
    titleElement.textContent = titleElement.textContent.replace(/^[^:]*:/, " ");
    const title = titleElement.textContent.trim().replace(/[^a-zA-Z0-9]+/g, " "); // Sanitize title

    // Send data to background script
    chrome.runtime.sendMessage({ pdfLink: pdfLink, title: title });
}


document.getElementById("downloadBtn").addEventListener("click", () => {
    // Get the active tab in the current window
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        // Execute extractData() in the content script
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: extractData
        });
    });
});
