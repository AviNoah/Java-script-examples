document.addEventListener('DOMContentLoaded', function () {
    const dropzone = document.querySelector('.dropzone');

    dropzone.addEventListener('dragenter', function () {
        handleDragEnter();
    });

    dropzone.addEventListener('dragleave', function () {
        handleDragLeave();
    });

    document.addEventListener('dragover', function (e) {
        e.preventDefault();
    });

    dropzone.addEventListener('drop', function (e) {
        e.preventDefault();
        handleDragLeave();

        // Check if the drop occurred on the drop zone or its children
        if (isEventOnDropzone(e)) {
            handle_dropped_files(e);
        }
    });

    function handleDragEnter() {
        dropzone.classList.add('dragover');
    }

    function handleDragLeave() {
        dropzone.classList.remove('dragover');
    }

    function isEventOnDropzone(event) {
        return dropzone.contains(event.target);
    }

    function handle_dropped_files(event) {
        const files = event.dataTransfer.files;
        // Handle the dropped files as needed
        console.log(files);
    }
});
