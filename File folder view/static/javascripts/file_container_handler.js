import { populate } from "./filter.js";
import { removeElementFromContainer } from "./common.js";

export function addFiles(event, files) {
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

    let fileDataWrapper = document.createElement('div');
    fileDataWrapper.classList.add("file-data-wrapper")

    let imgElement = document.createElement('img');
    imgElement.setAttribute("src", "../static/images/excel_logo_closed.svg");
    imgElement.setAttribute("alt", "Excel file");

    let textElement = document.createElement('p');
    textElement.textContent = file.name;

    fileDataWrapper.appendChild(imgElement);
    fileDataWrapper.appendChild(textElement);

    let buttonsWrapper = document.createElement('div');
    buttonsWrapper.classList.add("file-view-buttons")

    let queryListBtn = document.createElement('img');
    queryListBtn.classList.add("no-queries");  // When queries are added or changed update the class
    queryListBtn.setAttribute("src", "../static/images/QueryList.svg");
    queryListBtn.setAttribute("alt", "Filter list");

    let deleteBtn = document.createElement('img');
    deleteBtn.classList.add("delete")
    deleteBtn.addEventListener("click", () =>
        removeElementFromContainer(container, fileElement, `Are you sure you wish to remove ${file.name}?`)
    )
    deleteBtn.setAttribute("src", "../static/images/Delete.svg");
    deleteBtn.setAttribute("alt", "Delete");


    buttonsWrapper.appendChild(deleteBtn);
    buttonsWrapper.appendChild(queryListBtn);

    fileElement.appendChild(fileDataWrapper);
    fileElement.appendChild(buttonsWrapper);

    return fileElement
}

