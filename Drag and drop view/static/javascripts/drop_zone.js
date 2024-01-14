class DragAndDropZone extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Set default styles for drag-zone
        this.style.width = '80vw';
        this.style.height = '80vh';
        this.style.border = '2px dashed #aaa';
        this.style.borderRadius = '8px';
        this.style.display = 'flex';
        this.style.justifyContent = 'center';
        this.style.alignItems = 'center';
        this.style.fontFamily = 'Arial, sans-serif';
        this.style.position = 'relative';

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
