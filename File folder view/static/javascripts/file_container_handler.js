function addFiles(event, files) {
    // Get parent from event, in parent search for the div.files-folder
    const parentElement = event.target.parentElement; // Change this line based on your actual HTML structure

    // Get or create the files folder div
    let filesFolderDiv = parentElement.querySelector('.files-folder');
    if (!filesFolderDiv) {
        filesFolderDiv = document.createElement('div');
        filesFolderDiv.classList.add('files-folder');
        parentElement.appendChild(filesFolderDiv);
    }

    // Populate the files folder div with files
    files.forEach(file => {
        const fileElement = document.createElement('div');
        fileElement.textContent = file.name;
        filesFolderDiv.appendChild(fileElement);
    });
}