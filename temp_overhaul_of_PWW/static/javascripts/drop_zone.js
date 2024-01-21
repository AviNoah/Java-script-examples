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

        // Keep track of file reading with Promises array
        const filePromises = files.map(file =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = (event) => {
                    const blob = new Blob([event.target.result]);

                    formData.append('files', blob, file.name);

                    resolve();
                };

                reader.onerror = (error) => {
                    reject(error);
                };

                reader.readAsArrayBuffer(file);
            })
        );

        Promise.all(filePromises)
            .then(() => {
                console.log(formData);

                return fetch('/drop_files', {
                    method: 'POST',
                    body: formData,
                });
            })
            .then(response => {
                if (response.ok) {
                    console.log('Files added successfully');
                    addFiles(event, files);  // Add files to view
                } else {
                    console.error("Server didn't receive files.");
                }
            })
            .catch(error => {
                console.error(`These files weren't added successfully ${files}\n${error}`);
            });
    }

}

// Define the custom element
customElements.define('drop-zone', DragAndDropZone);