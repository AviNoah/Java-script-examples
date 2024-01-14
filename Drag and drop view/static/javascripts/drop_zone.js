class DragAndDropZone extends HTMLElement {
    constructor() {
        super();

        // Create a shadow root
        this.attachShadow({ mode: 'open' });

        // Fetch the external CSS file and apply it to the shadow root
        fetch('../static/styles/drop_zone_styles.css')
            .then(response => response.text())
            .then(cssText => {
                // Create a style element and apply the CSS text
                const styleElement = document.createElement('style');
                styleElement.textContent = cssText;

                // Append the style element and the dropzone container to the shadow root
                this.shadowRoot.appendChild(styleElement);
                this.shadowRoot.innerHTML += `
                    <div id="dropzone_main_page" class="dropzone">
                        <!-- Add any content you want within the custom element -->
                    </div>
                `;
            })
            .catch(error => console.error('Error fetching CSS:', error));
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
    }
}

// Define the custom element
customElements.define('drag-zone', DragAndDropZone);
