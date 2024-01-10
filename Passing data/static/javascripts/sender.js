function send(inputData, option) {
    switch (option) {
        case 1:
            URLParametersMethod(inputData);
            break;
    }
}

function URLParametersMethod(inputData) {
    // Encode the data and navigate to the destination page
    window.location.href = 'receiver.html?data=' + encodeURIComponent(inputData)
}