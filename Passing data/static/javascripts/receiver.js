function receive(option) {
    switch (option) {
        case 1:
            return URLParametersMethod();
        case 2:
            return localStorageMethod();
    }
}

function URLParametersMethod() {
    // Read URL Parameters
    var urlParams = new URLSearchParams(window.location.search);
    var receivedData = urlParams.get('data');
    return receivedData
}

function localStorageMethod() {
    // Read local storage
    return localStorage.getItem('data')
}