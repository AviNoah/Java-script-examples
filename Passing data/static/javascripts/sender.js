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
        case 4:
            cookieMethod(inputData);
            break;
    }
}

function URLParametersMethod(inputData) {
    // Encode the data and navigate to the destination page
    window.location.href = 'receiver.html?data=' + encodeURIComponent(inputData);
}

function localStorageMethod(inputData) {
    // Save into local storage under the key data
    // Data will stay stored in browser data regardless of server state
    localStorage.setItem('data', inputData);
    window.location.href = 'receiver.html';
}

function sessionStorageMethod(inputData) {
    // Save into local storage under the key data
    // Data will disappear the moment the session ends
    sessionStorage.setItem('data', inputData);
    window.location.href = 'receiver.html';
}

function cookieMethod(inputData) {
    // Save small data into cookies
    // cookies are separated by ;
    // We can add an expiration data
    var json_data = JSON.stringify(inputData);
    // Add expiration date, add path to clear cookie from entire domain once expires
    document.cookie = `${encodeURIComponent(json_data)}; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/;`;
    window.location.href = 'receiver.html';
}