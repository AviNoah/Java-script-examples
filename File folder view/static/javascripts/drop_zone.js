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

// Define the custom element
customElements.define('drop-zone', DragAndDropZone);