function send(inputData, option) {
    switch (option) {
        case 1:
            URLParametersMethod(inputData);
            break;
        case 2:
            localStorageMethod(inputData);
            break;
        case 3:
            sessionStorageMethod(inputData);
            break;
    }
}

function URLParametersMethod(inputData) {
    // Encode the data and navigate to the destination page
    window.location.href = 'receiver.html?data=' + encodeURIComponent(inputData)
}

function localStorageMethod(inputData) {
    // Save into local storage under the key data
    // Data will stay stored in browser data regardless of server state
    localStorage.setItem('data', inputData)
    window.location.href = 'receiver.html'
}

function sessionStorageMethod(inputData) {
    // Save into local storage under the key data
    // Data will disappear the moment the session ends
    sessionStorage.setItem('data', inputData);
    window.location.href = 'receiver.html';
}