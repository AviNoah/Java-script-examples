const filter_input_element = document.getElementById("filter_input");
const filter_selector_element = document.getElementById("filter_selector");

document.getElementById("filter_submit_button").addEventListener("click", submit_filter);

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function submit_filter() {
    let pattern_input = filter_input_element.value;
    let selection = filter_selector_element.value;

    if (pattern_input === "")
        return;  // Don't run if nothing entered

    pattern_input = escapeRegExp(pattern_input)

    const data = { 'selection': selection, 'pattern': pattern_input }
    const url = "" // fill later
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            // Handle the response, e.g., check if it's successful
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(responseData => {
            // Process the response data
            console.log(responseData);
        })
        .catch(error => {
            // Handle errors
            console.error("Error:", error);
        });
}