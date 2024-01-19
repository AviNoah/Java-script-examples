const options = ["Add", "Subtract", "Merge"];

// Handle multi-select options
export function showOptions(event) {
    var optionsDiv = getOptions();

    // Calculate the maximum allowed positions to avoid overflow
    var maxLeft = window.innerWidth - optionsDiv.clientWidth;
    var maxTop = window.innerHeight - optionsDiv.clientHeight;

    // Calculate the left position
    var left = Math.min(event.clientX, maxLeft);

    // Calculate the top position
    var top = Math.min(event.clientY, maxTop);

    optionsDiv.style.left = left + 'px';
    optionsDiv.style.top = top + 'px';
    optionsDiv.style.display = 'block';

    // Close the options when clicking outside
    document.addEventListener('click', (event) => {
        if (!optionsDiv.contains(event.target))
            closeOptions();  // clicked outside.
    });
}

function getOptions() {
    let optDiv = document.getElementById('options');

    //  Remove children
    while (optDiv.firstChild)
        optDiv.removeChild(optDiv.firstChild);

    for (const option of options) {
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = option;
        choiceDiv.onclick = function () { handleOption(option); }

        optDiv.appendChild(choiceDiv);
    }

    return optDiv;
}

function closeOptions() {
    var optionsDiv = document.getElementById('options');
    optionsDiv.style.display = 'none';

    // Remove the event listener to prevent multiple listeners
    document.removeEventListener('click', closeOptions);
}

function handleOption(option) {
    alert(`Selected option: ${option}`);

    // TODO: handle each options

    // Close the options after handling
    closeOptions();
}