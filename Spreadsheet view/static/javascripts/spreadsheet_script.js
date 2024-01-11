// Make the fileInput button element run handleFile() every time it changes
document.getElementById('fileInput').addEventListener('change', handleFile);

function handleFile(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (event) {
            const data = event.target.result;  // Get path
            const workbook = XLSX.read(data, { type: 'binary' }); // Read binary data of path
            const sheetName = workbook.SheetNames[0]; // Process first sheet
            const sheet = workbook.Sheets[sheetName];

            // Convert sheet data to HTML
            const html = XLSX.utils.sheet_to_html(sheet);

            // Display the HTML in the spreadsheet div
            document.getElementById('spreadsheet').innerHTML = html;
        };

        reader.readAsBinaryString(file);
    }
}
