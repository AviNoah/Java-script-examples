import { populate } from "./filter.js";
import { removeElementFromContainer } from "./common.js";

const validExtensions = ['.xlsx', '.csv']

export function addFiles(event, files) {
    // Get parent from event, in parent search for the div.files-folder
    const parentElement = event.target.parentElement;

    // Get or create the files folder div
    let filesFolderDiv = parentElement.querySelector('.files-folder');
    if (!filesFolderDiv) {
        return; // no file folder div found, this is not a place to dump files!
    }

    const invalidFiles = [];

    // Populate the files folder div with files
    Array.from(files).forEach(file => {
        const ext = file.name.split('.').pop().toLowerCase();  // Note we are removing the '.'

        if (ext && validExtensions.includes("." + ext)) {
            // Check if the extension is valid, only add if it is.
            const fileElement = makeFileElement(filesFolderDiv, file)
            filesFolderDiv.appendChild(fileElement);
        }
        else {
            console.log(`The file ${file.name} has an invalid extension.`);
            invalidFiles.push(file.name);
        }
    });

    if (invalidFiles.length !== 0)
        alert(`These files were not added: ${invalidFiles.join(', ')}`);
}

function makeFileElement(container, file) {
    let fileElement = document.createElement('div');
    fileElement.classList.add('file-view')

    let fileDataWrapper = document.createElement('div');
    fileDataWrapper.classList.add("file-data-wrapper")

    let imgElement = document.createElement('img');
    imgElement.setAttribute("src", "../static/images/excel_logo_closed.svg");
    imgElement.setAttribute("alt", "Excel file");
    imgElement.classList.add('filter-icon')
    imgElement.addEventListener("click", (event) => {
        if (!event.shiftKey) {
            // Stop multi select
            // Deselect old
            Array.from(container.getElementsByClassName('selected-file')).forEach((img) => {
                img.setAttribute("src", "../static/images/excel_logo_closed.svg");
                img.classList.remove('selected-file');
            })
        }

        // Deselect if already selected
        if (imgElement.classList.contains('selected-file')) {
            imgElement.setAttribute("src", "../static/images/excel_logo_closed.svg");
            imgElement.classList.remove('selected-file');
        }
        else {
            imgElement.setAttribute("src", "../static/images/excel_logo_opened.svg");
            imgElement.classList.add('selected-file');
        }
    })

    let textContainer = document.createElement('div');
    textContainer.classList.add('file-view-text-container'); // class for defining dimensions.

    let textElement = document.createElement('p');
    textElement.textContent = file.name;
    textElement.classList.add('tooltip'); // Add a class for styling

    // Tool tip when hovering
    let tooltipElement = document.createElement('span');
    tooltipElement.textContent = file.name;
    textElement.appendChild(tooltipElement);

    textContainer.appendChild(textElement);

    fileDataWrapper.appendChild(imgElement);
    fileDataWrapper.appendChild(textContainer);

    let buttonsWrapper = document.createElement('div');
    buttonsWrapper.classList.add("file-view-buttons")

    let queryListBtn = document.createElement('img');
    queryListBtn.classList.add('query-list');
    queryListBtn.classList.add("no-queries");  // When queries are added or changed update the class
    queryListBtn.addEventListener('click', () => {
        if (populate(fileElement))
            queryListBtn.classList.remove('no-queries');
        else
            queryListBtn.classList.add("no-queries");
    });
    queryListBtn.setAttribute("src", "../static/images/QueryList.svg");
    queryListBtn.setAttribute("alt", "Filter list");

    let downloadBtn = document.createElement('img');
    downloadBtn.classList.add("download")
    downloadBtn.addEventListener("click", () =>
        download(container, fileElement)
    );
    downloadBtn.setAttribute("src", "../static/images/Download.svg");
    downloadBtn.setAttribute("alt", "Download");

    let deleteBtn = document.createElement('img');
    deleteBtn.classList.add("delete")
    deleteBtn.addEventListener("click", () =>
        removeElementFromContainer(container, fileElement, `Are you sure you wish to remove ${file.name}?`)
    );
    deleteBtn.setAttribute("src", "../static/images/Delete.svg");
    deleteBtn.setAttribute("alt", "Delete");


    buttonsWrapper.appendChild(deleteBtn);
    buttonsWrapper.appendChild(queryListBtn);
    buttonsWrapper.appendChild(downloadBtn);

    fileElement.appendChild(fileDataWrapper);
    fileElement.appendChild(buttonsWrapper);

    return fileElement
}


function download(container, fileElement) {
    // Request the file from back-end and "download" it (copy it)
    // TODO: implement this
}

// Don't allow any image from the site to be dragged.
document.addEventListener('dragstart', (event) => {
    if (event.target.tagName === 'IMG')
        event.preventDefault();
})

// Handle releasing the shift key
document.addEventListener("keyup", (event) => {
    if (event.shiftKey)
        return;  // Shift is still held

    const selectedElements = Array.from(document.getElementsByClassName('selected-file'));

    if (selectedElements.length < 2) return;  // only handle multi-select

    alert(`Selected items: ${selectedElements.join(', ')}`)
})