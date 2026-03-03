document.getElementById("applyBtn").addEventListener("click", async () => {

    const selectedValue = document.getElementById("optionSelect").value;

    let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: selectOption,
        args: [selectedValue]
    });

});

// This function runs inside the webpage
function selectOption(value) {
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        if (radio.value === value) {
            radio.checked = true;
            radio.dispatchEvent(new Event('change', { bubbles: true }));
        }
    });
}