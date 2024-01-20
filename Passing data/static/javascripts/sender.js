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
        case 5:
            POSTMethod(inputData);
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
    document.cookie = `${encodeURIComponent(json_data)}; expires=Thu, 01 Jan 2020 00:00:00 UTC; path=/;`;
    window.location.href = 'receiver.html';
}

// Sending data to the backend server (Python)
// Since the server can't directly access the client's local storage, data is sent via fetch requests.
// The backend server then handles the received data and processes it accordingly.

function POSTMethod(inputData) {
    // NOTE: this method doesn't redirect to receiver.html because we handle response

    // This sends a POST request to the 'receiver.html' resource on the backend.

    // The fetch function returns a Promise object, allowing us to handle the result or failure.
    fetch('receiver.html', {
        // 'POST' is used to send data to a resource. Other methods include 'GET', 'DELETE', 'PATCH', 'OPTIONS', and 'HEAD'.
        method: 'POST',
        // Headers specify the content type being sent (in this case, JSON).
        headers: {
            'Content-Type': 'application/json'
        },
        // The body contains the data to be sent, stringified as JSON.
        body: JSON.stringify(inputData)
    })
        .then(response => response.json()) // Try to parse the response body as JSON.
        .then(data => console.log(data))  // Log the parsed data. If parsing fails, this will be a failed Promise.
        .catch(error => console.error(error)); // Catch and log any errors that occurred in the Promise chain.
}

function POSTMethodFormData() {
    const formData = new FormData();

    const formPromise = new Promise((resolve) => {
        // User text data
        formData.append("username", "Groucho");
        formData.append("accountnum", 123456);


        // JavaScript file-like object, represented as blobs
        const content = '<q id="a"><span id="b">hey!</span></q>';
        const blob = new Blob([content], { type: "text/xml" });
        formData.append("webmasterfile", blob);

        resolve()
    });

    formPromise.then(() => {
        fetch("url here",
            {
                method: "POST",
                body: formData,
            }
        )
    }).then((response) => {
        // Check if the request was successful (status code 2xx)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Handle the response here
        return response.json(); // Assuming the response is JSON
    }).then((data) => {
        // Handle the JSON data here
        console.log(data);
    }).catch((error) => {
        // Handle errors here
        console.error(error);
    });

}
