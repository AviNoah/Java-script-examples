import { DragAndDropZone } from "./drop_zone.js";

function addFiles(event, files) {
    // Get parent from event, in parent search for the div.files-folder
    const parentElement = event.target.parentElement;

    // Get or create the files folder div
    let filesFolderDiv = parentElement.querySelector('.files-folder');
    if (!filesFolderDiv) {
        filesFolderDiv = document.createElement('div');
        filesFolderDiv.classList.add('files-folder');
        parentElement.appendChild(filesFolderDiv);
    }

    // Populate the files folder div with files
    Array.from(files).forEach(file => {
        const fileElement = makeFileElement(filesFolderDiv, file)
        filesFolderDiv.appendChild(fileElement);
    });
}

function makeFileElement(container, file) {
    let fileElement = document.createElement('div');
    fileElement.classList.add('file-view')

    let imgElement = document.createElement('img');
    imgElement.setAttribute("src", "../static/images/excel_logo_closed.svg");
    imgElement.setAttribute("alt", "Excel file");

    let textElement = document.createElement('p');
    textElement.textContent = file.name;

    let buttonsWrapper = document.createElement('div');
    buttonsWrapper.classList.add("file-view-buttons")

    let historyBtn = document.createElement('img');
    historyBtn.classList.add("no-history")
    historyBtn.setAttribute("src", "../static/images/FullHistory.svg");
    historyBtn.setAttribute("alt", "Full history");

    let deleteBtn = document.createElement('img');
    deleteBtn.classList.add("delete")
    deleteBtn.addEventListener("click", () => removeFileFromContainer(container, fileElement, file.name))
    deleteBtn.setAttribute("src", "../static/images/Delete.svg");
    deleteBtn.setAttribute("alt", "Delete");

    buttonsWrapper.appendChild(historyBtn);
    buttonsWrapper.appendChild(deleteBtn);

    fileElement.appendChild(imgElement);
    fileElement.appendChild(textElement);
    fileElement.appendChild(buttonsWrapper);

    return fileElement
}

function removeFileFromContainer(container, fileElement, file_name) {
    const choice = confirm(`Are you sure you wish to delete ${file_name}?`)
    console.log(`User deleted ${file_name}`)

    if (choice)
        container.removeChild(fileElement);

}


const dragAndDrop = DragAndDropZone(addFiles)

// Define the custom element
customElements.define('drop-zone', dragAndDrop);