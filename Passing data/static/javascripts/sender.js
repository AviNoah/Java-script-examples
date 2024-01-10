function send(inputData, option) {
    switch (option) {
        case 1:
            URLParametersMethod(inputData);
            break;
        case 2:
            localStorageMethod(inputData);
            break;
    }
}

function URLParametersMethod(inputData) {
    // Encode the data and navigate to the destination page
    window.location.href = 'receiver.html?data=' + encodeURIComponent(inputData)
}

function localStorageMethod(inputData) {
    // Save into local storage under the key data
    localStorage.setItem('data', inputData)
    window.location.href = 'receiver.html'
}