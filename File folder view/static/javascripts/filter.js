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

const methodOptions = [
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
        if (!targetElement.contains(event.target)) {
            sendChanges(targetElement, container); // Send changes
            targetElement.removeChild(container);  // Remove if click anywhere else on doc
        }
    })
}

function populateFilter(container, filter_data) {
    const { column, method, input } = filter_data;

    const filter = document.createElement('div');
    filter.classList.add('filter-wrapper');

    const searchCriteriaContainerDiv = document.createElement('div');
    searchCriteriaContainerDiv.classList.add('filter-search-container')

    const selectorColumn = document.createElement('select');
    selectorColumn.classList.add('filter-selector');

    // Iterate through columns and add to selector
    const columnsOptions = requestColumns();  // fetch all columns of the spreadsheet
    columnsOptions.forEach((columnItem) => {
        const option = document.createElement('option');
        option.classList.add('filter-option');
        option.value = columnItem.value;
        option.text = columnItem.text;

        if (option.value === method)
            option.selected = true;

        selectorMethod.appendChild(option);
    });

    const selectorMethod = document.createElement('select');
    selectorMethod.classList.add('filter-selector');

    // Iterate through possible methods and add to selector
    methodOptions.forEach((method) => {
        const option = document.createElement('option');
        option.classList.add('filter-option');
        option.value = method.value;
        option.text = method.text;

        if (option.value === method)
            option.selected = true;

        selectorMethod.appendChild(option);
    });

    const inpField = document.createElement('input');
    inpField.classList.add('filter-input')
    inpField.type = 'text';
    inpField.value = input;

    searchCriteriaContainerDiv.appendChild(selectorColumn);
    searchCriteriaContainerDiv.appendChild(selectorMethod);
    searchCriteriaContainerDiv.appendChild(inpField);

    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('filter-buttons');

    const submitButton = document.createElement('button');
    submitButton.classList.add('filter-submit');
    submitButton.textContent = 'Submit';
    submitButton.addEventListener('click', () => submit(column, selectorMethod, inpField));

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('filter-delete', 'dangerous'); // elements marked dangerous will require confirm
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => removeElementFromContainer(container, filter, "Remove filter?"))

    buttonDiv.appendChild(submitButton);
    buttonDiv.appendChild(deleteButton);

    filter.appendChild(searchCriteriaContainerDiv);
    filter.appendChild(buttonDiv);

    const handleFilterChange = (event) => { submitButton.classList.add('changed') }

    filter.addEventListener('input', handleFilterChange);
    filter.addEventListener('change', handleFilterChange);

    // Return the filter element
    return filter;
}

function submit(column, selector, inpField) {
    const method = selector.value;
    const input = inpField.value;

    // Send to back end to process, implement later
    console.log(`Column: ${column}, Method: ${method}, Input: ${input}`);
}

function sendChanges(fileTarget, filtersContainer) {
    // TODO: send the changed filters to the fileTarget's folder at back-end and save them
}

function requestFileData(targetElement) {
    // Request from back end the file data
    return files['test_file.xlsx'];  // implement later
}

function requestColumns() {
    // Request columns of the selected datasheet from back-end
    // TODO: Implement later
}