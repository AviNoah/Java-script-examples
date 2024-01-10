function receive(option) {
    switch (option) {
        case 1:
            return URLParametersMethod(inputData);

    }
}

function URLParametersMethod() {
    // Read URL Parameters
    var urlParams = new URLSearchParams(window.location.search);
    var receivedData = urlParams.get('data');
    return receivedData
}