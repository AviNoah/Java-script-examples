// file_tree_handler.js

document.addEventListener("DOMContentLoaded", function () {
    let fileTrees = document.getElementsByClassName("file_tree");
    Array.from(fileTrees).forEach(fileTree => {
        fileTree.addEventListener("input", () => { addItem(fileTree) });
    });
});

function addItem(fileTree) {
    let items = fileTree.getElementsByTagName("li");
    let lastItem = items[items.length - 1];

    // Check if lastItem was entered text; if so, add a new item under it
    if (lastItem.textContent.trim() !== "") {
        let newItem = document.createElement("li");
        newItem.setAttribute("contenteditable", "true");
        newItem.addEventListener("input", (event) => { addItem(fileTree, event) });

        // Create a delete button with an image
        let deleteButton = document.createElement("img");
        deleteButton.setAttribute("src", "../static/images/Delete.svg");
        deleteButton.setAttribute("alt", "Delete");
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", () => deleteItem(fileTree, newItem));

        newItem.appendChild(deleteButton);
        fileTree.appendChild(newItem);
        newItem.focus();
    }
}

function deleteItem(fileTree, item) {
    if (fileTree.contains(item)) {
        fileTree.removeChild(item);
        console.log(`Removed child from file list with value ${item.textContent}`);
    }
}
