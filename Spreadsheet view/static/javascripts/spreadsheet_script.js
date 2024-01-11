// Make the fileInput button element run handleFile() every time it changes
document.getElementById('fileInput').addEventListener('change', handleFile);

// Get reference to the selected sheet spinner element
const selectedSheetSpinner = document.getElementById('selectedSheet');
selectedSheetSpinner.addEventListener('change', changeSheet);

// Get reference to spreadsheet element div
const spreadsheetElement = document.getElementById('spreadsheet');

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

// Function to update the spreadsheet element with grid lines and filter buttons
function updateSpreadsheetElement(sheet) {
    // Convert sheet data to HTML with grid lines
    const html = XLSX.utils.sheet_to_html(sheet, { editable: false, showGridLines: true });

    // Display the HTML in the spreadsheet div
    spreadsheetElement.innerHTML = html;

    // Add filter logo images to all cells in the first row
    const firstRowCells = spreadsheetElement.querySelectorAll('tr:first-child td');
    firstRowCells.forEach(cell => {
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
        filterImg.addEventListener('click', () => applyFilter(cell.cellIndex + 1)); // Add 1 to cellIndex to adjust for 0-based index
    });
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

// Function to adjust the selected sheet spinner properties
function adjustSpinner(sheetCount) {
    // Set the value to 1 and change the maximum value to sheet count
    selectedSheetSpinner.value = 1;
    selectedSheetSpinner.max = sheetCount;
}

// Function to apply a filter (customize as needed)
function applyFilter(columnIndex) {
    // Apply filter to workbook
    console.log(`Applying filter to column ${columnIndex}`);

}