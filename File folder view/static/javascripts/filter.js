// A script to create filter elements and populate the filter lists of a file-view

// files will contain a dictionary of {file_name: file_data}
// file_data will contain a list of tuples: (column to filter by and then, {method: input}) 
const files = {
    'test_file.xlsx':
        [
            ("ID", { 'regex': '\d+' }), ("Name", { 'contains': 'Avi' }), ("Surname", { 'contains': 'Noah' })
        ]
}


function populate(targetElement) {
    const filters = requestFileData(targetElement);
    const filter_div = document.createElement('div');
    filter_div.classList.add('filters_container');

    Array.from(filters).forEach((filter_data) => {
        filter_div.appendChild(populateFilter(filter_data));
    })

    targetElement.appendChild(filter_div)
}

selectorOptions = [
    { value: 'exact', text: 'Exact match' },
    { value: 'contains', text: 'Contains' },
    { value: 'not contains', text: 'Does not contain' },
    { value: 'regex', text: 'RegEx' }
];

function populateFilter(filter_data) {
    // (column name: {method: input})
    const column = filter_data[0];
    const method = Object.keys(filter_data[1]);
    const filter_input = filter_data[1][method];

    const filter = document.createElement('div');
    filter.classList.add('filter wrapper');

    const selector = document.createElement('select');
    selector.classList.add('filter-selector');

    // Iterate through the data and add options to the select element
    selectorOptions.forEach(item => {
        const option = document.createElement('option');
        option.classList.add("filter-option");
        option.value = item.value;
        option.text = item.text;

        if (option.value === column)
            option.selected = true;

        selectElement.appendChild(option);
    });

    const inpField = document.createElement('input');
    inpField.type = "text";
    inpField.value = filter_input;

    const submitButton = document.createElement('button');
    submitButton.classList.add('filter-submit');
    submitButton.text = "Submit";
    submitButton.addEventListener("click", () => { submit(selector, inpField) });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('filter-delete');
    deleteButton.classList.add('dangerous'); // elements marked dangerous will require confirm

    filter.appendChild(selector);
    filter.appendChild(inpField);
    filter.appendChild(submitButton);
    filter.appendChild(deleteButton);

    return filter;
}

function submit(selector, inpField) {
    const selection = selector.value;
    const input = inpField.value;

    // Send to back end to process, implement later
}

function requestFileData(targetElement) {
    // Request from back end the file data
    return files['test_file.xlsx'];  // implement later
}