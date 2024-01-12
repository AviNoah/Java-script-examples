
const dropzone = document.getElementById('dropzone_main_page')

// Listen to file dragging
dropzone.addEventListener('dragover', (e) => {
    e.preventDefault()
    dropzone.classList.add('hover')
})

// Listen to drag stop
dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('hover')
})


// Listen to file drop
dropzone.addEventListener('drop', (e) => {
    e.preventDefault()
    dropzone.classList.remove('hover')
    handle_dropped_files(e)
})

function handle_dropped_files(event) {

    const files = event.dataTransfer.files
    // Handle the dropped files as needed
    console.log(files)
}