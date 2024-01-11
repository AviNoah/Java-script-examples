// Make the fileInput button element run handleFile() every time it changes
document.getElementById('fileInput').addEventListener('change', handleFile);
const selected_sheet_spinner = document.getElementById('selectedSheet');
selected_sheet_spinner.addEventListener('change', changeSheet)

function handleFile(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const data = event.target.result;  // Get path
            const workbook = XLSX.read(data, { type: 'binary' }); // Read binary data of path
            sessionStorage.setItem("selected_workbook", JSON.stringify(workbook))
            const sheetName = workbook.SheetNames[0];  // Always start on first page
            const sheet = workbook.Sheets[sheetName];

            // Convert sheet data to HTML
            const html = XLSX.utils.sheet_to_html(sheet);

            // Display the HTML in the spreadsheet div
            document.getElementById('spreadsheet').innerHTML = html;
        };

        reader.readAsBinaryString(file);
    }
}

function changeSheet() {
    let selected_workbook = sessionStorage.getItem("selected_workbook")
    if (selected_workbook) {
        selected_workbook = JSON.parse(selected_workbook);  // Parse json
        const sheet_name = selected_workbook.SheetNames[selected_sheet_spinner.value - 1];
        const sheet = selected_workbook.Sheets[sheet_name];


        // Convert sheet data to HTML
        const html = XLSX.utils.sheet_to_html(sheet);

        // Display the HTML in the spreadsheet div
        document.getElementById('spreadsheet').innerHTML = html;
    }
}

function adjustSpinner(sheetCount) {
    // Change maximum value of spinner to sheet count.
    // Set value to 1.
    selected_sheet_spinner.value = 1;
    selected_sheet_spinner.max = sheetCount;
}
