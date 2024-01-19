// Script to handle selecting multiple documents

document.addEventListener('keydown', (event) => {
    if (event.key !== "shift")
        return;

    selectElements(event);
})

document.addEventListener('keyup', (event) => {
    if (event.key !== "shift")
        return;

    deSelectElements();
})

function selectElements(event) {
    if (event.target.classList.contains(".file-view")) {
        const selected = event.target.find('.file-view');
        if (selected.classList.contains('.multi-selected'))
            selected.classList.remove('multi-selected')
        else
            selected.classList.add('multi-selected');
    }
}

function deSelectElements() {
    const selectedViews = document.getElementsByClassName('.file-view .multi-selected');
    // Return if none were selected
    if (selectedViews.length === 0) return;

    popUpWindow(selectedViews);

    // Deselect them
    Array.from(selectedViews).forEach((view) => { view.classList.remove('multi-selected') })

}

function popUpWindow(selectedViews) {
    alert(`Selected views are: ${selectedViews.join(",")}`)
}