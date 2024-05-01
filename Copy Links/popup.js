document.getElementById('copy-button').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'copyLinks' }, response => {
        if (response.success) {
            document.getElementById('success-message').style.display = 'inline';
            document.getElementById('failure-message').style.display = 'none';
            document.getElementById('success-message').style.opacity = '1';
            document.getElementById('failure-message').style.opacity = '0';
        } else {
            document.getElementById('success-message').style.display = 'none';
            document.getElementById('failure-message').style.display = 'inline';
            document.getElementById('success-message').style.opacity = '0';
            document.getElementById('failure-message').style.opacity = '1';
        }
        setTimeout(() => {
            document.getElementById('success-message').style.opacity = '0';
            document.getElementById('failure-message').style.opacity = '0';
            document.getElementById('success-message').style.display = 'none';
            document.getElementById('failure-message').style.display = 'none';
        }, 5000);
    });
});

function getFileTypes() {
    let fileTypes = [];
    document.querySelectorAll('input[name="file-type"]:checked').forEach((checkbox) => {
        fileTypes.push(checkbox.value);
    });
    return fileTypes;
}

document.getElementById('category').addEventListener('change', (event) => {
    chrome.runtime.sendMessage({ action: 'setCategory', category: event.target.value });
});

document.querySelectorAll('input[name="file-type"]').forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        chrome.runtime.sendMessage({ action: 'setFileTypes', fileTypes: getFileTypes() });
    });
});

document.getElementById('category').addEventListener('change', function () {
    var selectedCategory = this.value;
    var categories = document.querySelectorAll('.category');
    categories.forEach(function (category) {
        if (category.getAttribute('data-category') === selectedCategory) {
            category.classList.add('active');
        } else {
            category.classList.remove('active');
        }
    });
});

document.getElementById('regex-pattern').addEventListener('input', (event) => {
    chrome.runtime.sendMessage({ action: 'setRegexPattern', regexPattern: event.target.value });
});

document.getElementById("regex-enable").addEventListener("click", showInputBox);

function showInputBox() {
    var checkBox = document.getElementById("regex-enable");
    var inputBox = document.getElementById("input-box");
    if (checkBox.checked == true) {
        inputBox.style.display = "block";
    } else {
        inputBox.style.display = "none";
        chrome.runtime.sendMessage({ action: 'setRegexPattern', regexPattern: '' });
    }
}
