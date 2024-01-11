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

// Function to update the spreadsheet element with grid lines
function updateSpreadsheetElement(sheet) {
    // Convert sheet data to HTML with grid lines
    const html = XLSX.utils.sheet_to_html(sheet, { editable: false, showGridLines: true });

    // Display the HTML in the spreadsheet div
    spreadsheetElement.innerHTML = html;
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
