class DragAndDropZone extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Set default size to 80% of the viewport
        this.style.width = '80vw';
        this.style.height = '80vh';


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
    }
}

// Define the custom element
customElements.define('drag-zone', DragAndDropZone);
