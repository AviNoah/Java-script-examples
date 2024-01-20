import { addFiles } from "./file_container_handler.js";
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
        const files = Array.from(event.dataTransfer.files);

        // Create a FormData object
        const formData = new FormData();

        // Append each file and its information to the FormData
        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const fileData = new Uint8Array(event.target.result);
                const blob = new Blob([fileData]);

                // Append the file data and information to the FormData
                formData.append('fileName', file.name);
                formData.append('fileContents', blob);
                formData.append('modificationDate', file.lastModifiedDate.toISOString());
                formData.append('creationDate', file.lastModified);
                formData.append('fileType', file.type);
            };

            // Read the file as ArrayBuffer
            reader.readAsArrayBuffer(file);
        });

        // Send the FormData to the server
        fetch('/drop_files', {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (response.status === 200) {
                    console.log('Files added successfully');
                    addFiles(event, files);  // Add files to view
                } else {
                    console.error("Server didn't receive files.");
                }
            })
            .catch(error =>
                console.error(`These files weren't added successfully ${files}\n${error}`)
            );
    }
}

// Define the custom element
customElements.define('drop-zone', DragAndDropZone);