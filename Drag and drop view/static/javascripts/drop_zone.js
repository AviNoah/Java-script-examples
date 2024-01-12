// Wait for DOC content to load
document.addEventListener('DOMContentLoaded', function () {
    const dropzone = document.querySelector('.dropzone');

    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('dragover');
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        handle_dropped_files(e);
    });

    function handle_dropped_files(event) {
        const files = event.dataTransfer.files;
        // Handle the dropped files as needed
        console.log(files);
    }
});
