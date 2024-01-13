document.addEventListener('DOMContentLoaded', function () {
    // Add dragover event listener to the entire document
    document.addEventListener('dragover', function (e) {
        e.preventDefault();
        handleDragOver();
    });

    // Add dragleave event listener to the entire document
    document.addEventListener('dragleave', function () {
        handleDragLeave();
    });

    // Add drop event listener to the entire document
    document.addEventListener('drop', function (e) {
        e.preventDefault();
        handleDragLeave();
        handle_dropped_files(e);
    });

    function handleDragOver() {
        const dropzone = document.querySelector('.dropzone');
        dropzone.classList.add('dragover');
    }

    function handleDragLeave() {
        const dropzone = document.querySelector('.dropzone');
        dropzone.classList.remove('dragover');
    }

    function handle_dropped_files(event) {
        const files = event.dataTransfer.files;
        // Handle the dropped files as needed
        console.log(files);
    }
});
