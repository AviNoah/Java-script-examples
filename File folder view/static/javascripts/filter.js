import { removeElementFromContainer } from "./common.js";

// A script to create filter elements and populate the filter lists of a file-view

// files will contain a dictionary of {file_name: file_data}
// file_data will contain a list of dicts with keys column, method and input
const files = {
    'test_file.xlsx':
        [
            { column: "ID", method: 'regex', input: '\d+' },
            { column: "Name", method: 'contains', input: 'Avi' },
            { column: "Surname", method: 'contains', input: 'Noah' }
        ]
}

const selectorOptions = [
    { value: 'exact', text: 'Exact match' },
    { value: 'contains', text: 'Contains' },
    { value: 'not contains', text: 'Does not contain' },
    { value: 'regex', text: 'RegEx' }
];

export function populate(targetElement) {
    // Make sure there is only 1 filter on screen
    const existingFilters = document.getElementsByClassName('filter-popup-wrapper');
    if (existingFilters.length > 0)
        Array.from(existingFilters).forEach((existingFilter) => existingFilter.parentElement.removeChild(existingFilter));

    // Populate list with filters and create pop up
    const filters = requestFileData(targetElement);
    const filterDiv = document.createElement('div');
    filterDiv.classList.add('filter-popup-wrapper');

    filters.forEach((filter_data) => {
        filterDiv.appendChild(populateFilter(filterDiv, filter_data));
    })

    const container = document.createElement('div');
    container.classList.add('filter-popup-container');
    container.appendChild(filterDiv)
    targetElement.appendChild(container);

    document.addEventListener("click", (event) => {
        if (!targetElement.contains(filterDiv))
            return;  // Return if not contains child
        if (!targetElement.contains(event.target))
            targetElement.removeChild(filterDiv);  // Remove if click anywhere else on doc
    })
}

function populateFilter(container, filter_data) {
    const { column, method, input } = filter_data;

    const filter = document.createElement('div');
    filter.classList.add('filter-wrapper');

    const searchCriteriaContainerDiv = document.createElement('div');
    searchCriteriaContainerDiv.classList.add('filter-search-container')

    const selector = document.createElement('select');
    selector.classList.add('filter-selector');

    // Iterate through the data and add options to the select element
    selectorOptions.forEach((item) => {
        const option = document.createElement('option');
        option.classList.add('filter-option');
        option.value = item.value;
        option.text = item.text;

        if (option.value === method)
            option.selected = true;

        selector.appendChild(option);
    });

    const inpField = document.createElement('input');
    inpField.classList.add('filter-input')
    inpField.type = 'text';
    inpField.value = input;

    searchCriteriaContainerDiv.appendChild(selector);
    searchCriteriaContainerDiv.appendChild(inpField);

    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('filter-buttons');

    const submitButton = document.createElement('button');
    submitButton.classList.add('filter-submit');
    submitButton.textContent = 'Submit';
    submitButton.addEventListener('click', () => submit(column, selector, inpField));

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('filter-delete', 'dangerous'); // elements marked dangerous will require confirm
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => removeElementFromContainer(container, filter, "Remove filter?"))

    buttonDiv.appendChild(submitButton);
    buttonDiv.appendChild(deleteButton);

    filter.appendChild(searchCriteriaContainerDiv);
    filter.appendChild(buttonDiv);

    return filter;
}

function submit(column, selector, inpField) {
    const method = selector.value;
    const input = inpField.value;

    // Send to back end to process, implement later
    console.log(`Column: ${column}, Method: ${method}, Input: ${input}`);
}

function requestFileData(targetElement) {
    // Request from back end the file data
    return files['test_file.xlsx'];  // implement later
}
