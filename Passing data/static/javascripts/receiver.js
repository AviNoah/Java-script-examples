function receive(option) {
    switch (option) {
        case 1:
            return URLParametersMethod();
        case 2:
            return localStorageMethod();
        case 3:
            return sessionStorageMethod();
        case 4:
            return cookieMethod();
        case 5:
            return POSTMethod();
    }
}

function URLParametersMethod() {
    // Read URL Parameters
    var urlParams = new URLSearchParams(window.location.search);
    var receivedData = urlParams.get('data');
    return receivedData;
}

function localStorageMethod() {
    // Read local storage
    return localStorage.getItem('data');
}

function sessionStorageMethod() {
    // Read local session storage
    return sessionStorage.getItem('data', inputData);
}

function cookieMethod() {
    // Read cookie data
    var cookies = document.cookie.split(';');
    var cookie_json_data = document.cookie;
    var decoded_json_data = decodeURIComponent(cookie_json_data);
    var parsed_data;
    try {
        parsed_data = JSON.parse(decoded_json_data)
    }
    catch (error) {
        parsed_data = ""
    }
    console.log(parsed_data);
    // Parse the JSON string back to an object
    return decoded_json_data;
}

function POSTMethod() {
    return "Data was sent to backend server"
}