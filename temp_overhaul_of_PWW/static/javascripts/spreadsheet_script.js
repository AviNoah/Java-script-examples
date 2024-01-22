// Make the fileInput button element run handleFile() every time it changes
document.getElementById('fileInput').addEventListener('change', handleFile);

// Get reference to the selected sheet spinner element
const selectedSheetSpinner = document.getElementById('selectedSheet');
selectedSheetSpinner.addEventListener('change', changeSheet);

// Get reference to spreadsheet element div
const spreadsheetElement = document.getElementById('spreadsheet');

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
// Add a loading class to the body while waiting for the response
function setLoadingState(loading) {
    document.body.classList.toggle('loading', loading);
}

function process_filter(columnIndex) {
    setLoadingState(true);
    // Get the selected filter type
    const selection = document.getElementById('filter_selector').value;

    // Get the filter input value
    const patternInput = document.getElementById('filter_input').value;

    console.log(`Pattern input is: ${patternInput} for selection ${selection} on column ${columnIndex}`)

    if (patternInput === "") {
        setLoadingState(false);
        return;  // Don't run if nothing entered
    }

    const escapedPatternInput = escapeRegExp(patternInput);

    const data = { 'selection': selection, 'pattern': escapedPatternInput }

    fetch("/add_filter", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            setLoadingState(false);

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
            setLoadingState(false);

            // Handle errors
            console.error("Error:", error);
        });
}

// Function to handle file input changes
function handleFile(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (event) {
            try {
                const data = event.target.result;
                const workbook = XLSX.read(data, { type: 'binary' });

                // Save the selected workbook in sessionStorage
                sessionStorage.setItem("selected_workbook", JSON.stringify(workbook));

                // Always start on the first page
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];

                updateSpreadsheetElement(sheet);

                // Adjust the spinner based on the number of sheets
                adjustSpinner(workbook.SheetNames.length);
            } catch (error) {
                console.error("Error reading the Excel file:", error);
            }
        };

        reader.readAsBinaryString(file);
    }
}


// Function to adjust the selected sheet spinner properties
function adjustSpinner(sheetCount) {
    // Set the value to 1 and change the maximum value to sheet count
    selectedSheetSpinner.value = 1;
    selectedSheetSpinner.max = sheetCount;
}


// Function to update the spreadsheet element with grid lines and filter buttons
function updateSpreadsheetElement(sheet) {
    // Convert sheet data to HTML with grid lines
    const html = XLSX.utils.sheet_to_html(sheet, { editable: false, showGridLines: true });

    // Display the HTML in the spreadsheet div
    spreadsheetElement.innerHTML = html;

    // Add filter logo images to all cells in the first row
    const firstRowCells = spreadsheetElement.querySelectorAll('tr:first-child td');
    firstRowCells.forEach(cell => {
        // Add filter-cell class to header cells
        cell.classList.add('filter-cell');

        const filterImg = document.createElement('img');
        filterImg.src = '../static/images/filter_logo.svg';
        filterImg.classList.add("filter");
        filterImg.alt = 'Filter';
        filterImg.style.cursor = 'pointer';

        // Create a wrapper div for proper spacing
        const wrapperDiv = document.createElement('div');
        wrapperDiv.style.display = 'flex';
        wrapperDiv.style.flexDirection = 'row'; // Horizontal layout
        wrapperDiv.style.alignItems = 'center'; // Center vertically
        wrapperDiv.style.justifyContent = 'space-between'; // Maximize horizontal space
        wrapperDiv.style.marginRight = '5px'; // Adjust the right margin as needed

        // Append the cell name and filter image to the wrapper div
        const cellName = document.createTextNode(cell.textContent);
        wrapperDiv.appendChild(cellName);
        wrapperDiv.appendChild(filterImg);

        // Clear the original content and append the wrapper div
        cell.innerHTML = '';
        cell.appendChild(wrapperDiv);

        // Add a margin to the filter image for additional separation
        filterImg.style.marginLeft = '5px'; // Adjust the left margin as needed

        // Apply filter when the filter image is clicked
        filterImg.addEventListener('click', (event) => applyFilter(event, cell.cellIndex + 1)); // Add 1 to cellIndex to adjust for 0-based index
    });
}

// Function to create a filter popup element
async function createFilterPopup(columnIndex) {
    // Check if a filter popup already exists and remove it
    const existingPopup = document.querySelector('.filter-popup');
    if (existingPopup) {
        existingPopup.parentNode.removeChild(existingPopup);
    }

    // Create a filter popup element
    const filterPopup = document.createElement('div');
    filterPopup.className = 'filter-popup';

    // Load content from external HTML file
    const response = await fetch('filter_popup');
    if (!response.ok) {
        console.error("Failed to fetch filterPopup html file");
        return null;
    }

    try {
        let content = await response.text();

        filterPopup.innerHTML = content;
        document.body.appendChild(filterPopup);

        // Make the filter submit button run process_input every time it is clicked
        document.getElementById('filter_submit_button').addEventListener('click', () => process_filter(columnIndex));
        return filterPopup;
    }
    catch (error) {
        console.error(error)
    }
}


// Function to handle closing the filter popup
function closeFilterPopup(event) {
    const filterPopup = document.querySelector('.filter-popup');

    // Check if the clicked element or its parent is outside the filter popup
    if (!filterPopup)
        return;  // Not initialized yet

    if (
        (event.target.classList.contains('selected') || event.target.parentElement.classList.contains('selected')) &&
        !filterPopup.contains(event.target)
    ) {
        // Filter icon was selected again, don't close popup
        return;
    }

    if (event.target !== filterPopup && !filterPopup.contains(event.target)) {
        filterPopup.style.display = 'none';
        document.removeEventListener('click', closeFilterPopup);
    }
}


// Function to handle changes in the selected sheet spinner
function changeSheet() {
    const selectedWorkbookStr = sessionStorage.getItem("selected_workbook");

    if (selectedWorkbookStr) {
        try {
            const selectedWorkbook = JSON.parse(selectedWorkbookStr);

            // Adjust for 0-based index
            const sheetIndex = selectedSheetSpinner.value - 1;

            const sheetName = selectedWorkbook.SheetNames[sheetIndex];
            const sheet = selectedWorkbook.Sheets[sheetName];

            // Update the spreadsheet element
            updateSpreadsheetElement(sheet);
        } catch (error) {
            console.error("Error parsing selected workbook:", error);
        }
    }
}

// Function to apply a filter (customize as needed)
async function applyFilter(event, columnIndex) {
    // Apply filter to workbook
    console.log(`Applying filter to column ${columnIndex}`);

    // Show the filter popup below the clicked filter image
    const filterPopup = await createFilterPopup(columnIndex);

    // Get all filter images
    const filterImages = document.querySelectorAll('.filter');

    // Remove 'selected' class from all filter images
    filterImages.forEach(img => img.classList.remove('selected'));

    // Get the clicked filter image and add 'selected' class
    const clickedFilterImg = event.target;
    clickedFilterImg.classList.add('selected');

    // Get the position of the clicked filter image
    const rect = clickedFilterImg.getBoundingClientRect();

    // Set the position of the filter popup relative to the clicked filter image
    filterPopup.style.position = 'absolute';
    filterPopup.style.left = `${rect.left + window.scrollX}px`; // Include horizontal scroll
    filterPopup.style.top = `${rect.bottom + window.scrollY}px`; // Include vertical scroll
    filterPopup.style.display = 'block';

    // Close the popup when clicking outside of it
    document.addEventListener('click', closeFilterPopup);
}