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
        const files = event.dataTransfer.files;
        // Handle the dropped files as needed
        console.log('Dropped Files:', files);
        addFiles(event, files)

        fetch('/drop_files', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(files)
        }).then(response => {
            if (response.status === 200)
                console.log("Files added successfully");
            else
                console.error("Server didn't receive files.")

        }).catch(error =>
            console.error(`These files weren't added successfully ${files}\n${error}`)
        );
    }
}

// Define the custom element
customElements.define('drop-zone', DragAndDropZone);