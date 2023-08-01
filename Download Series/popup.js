document.getElementById('copy-button').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'copyLinks' }, response => {
        if (response.success) {
            document.getElementById('success-message').style.display = 'inline';
            document.getElementById('failure-message').style.display = 'none';
        } else {
            document.getElementById('success-message').style.display = 'none';
            document.getElementById('failure-message').style.display = 'inline';
        }
    });
});
