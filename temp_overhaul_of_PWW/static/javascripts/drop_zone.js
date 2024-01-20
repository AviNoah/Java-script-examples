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

        // Create an array of promises, each resolving to an object containing file information
        const filesInfoPromises = files.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = (event) => {
                    // Resolve with an object containing file information
                    resolve({
                        name: file.name,
                        lastModified: file.lastModified,
                        lastModifiedDate: file.lastModifiedDate,
                        webkitRelativePath: file.webkitRelativePath,
                        size: file.size,
                        type: file.type,
                        content: event.target.result, // File content as base64 or text, depending on the file type
                    });
                };

                // Read the file as ArrayBuffer
                reader.readAsArrayBuffer(file);
            });
        });

        // Wait for all promises to resolve
        Promise.all(filesInfoPromises)
            .then(filesInfo => {
                // filesInfo is an array of objects, each containing file information and content
                console.log('Dropped Files:', filesInfo);

                // Send the filesInfo to the server
                return fetch('/drop_files', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(filesInfo)
                });
            })
            .then(response => {
                if (response.status === 200) {
                    console.log("Files added successfully");
                    addFiles(event, files);  // Add files to view
                }
                else
                    console.error("Server didn't receive files.");
            })
            .catch(error =>
                console.error(`These files weren't added successfully ${files}\n${error}`)
            );
    }
}

// Define the custom element
customElements.define('drop-zone', DragAndDropZone);