class DragAndDropZone extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        document.addEventListener('dragenter', this.handleDragEnter.bind(this));
        document.addEventListener('dragleave', this.handleDragLeave.bind(this));
        document.addEventListener('dragover', this.handleDragOver.bind(this));
        document.addEventListener('drop', this.handleDrop.bind(this));
    }

    handleDragEnter() {
        this.classList.add('dragover');
    }

    handleDragLeave() {
        this.classList.remove('dragover');
    }

    handleDragOver(e) {
        e.preventDefault();
        this.handleDragEnter();
    }

    handleDrop(e) {
        e.preventDefault();
        this.handleDragLeave();

        // Check if the drop occurred on the zone or its children
        if (this.contains(e.target)) {
            this.handleDroppedFiles(e);
        }
    }

    handleDroppedFiles(event) {
        const files = event.dataTransfer.files;
        // Handle the dropped files as needed
        console.log('Dropped Files:', files);
        addFiles(event, files)
    }
}

// Define the custom element
customElements.define('drop-zone', DragAndDropZone);

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
    Array.from(files).forEach(file => {
        const fileElement = makeFileElement(file)
        filesFolderDiv.appendChild(fileElement);
    });
}

function makeFileElement(file) {
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
    deleteBtn.setAttribute("src", "../static/images/Delete.svg");
    deleteBtn.setAttribute("alt", "Delete");

    buttonsWrapper.appendChild(historyBtn);
    buttonsWrapper.appendChild(deleteBtn);

    fileElement.appendChild(imgElement);
    fileElement.appendChild(textElement);
    fileElement.appendChild(buttonsWrapper);

    return fileElement
}
