// file_tree_handler.js

document.addEventListener("DOMContentLoaded", function () {
    let fileTrees = document.getElementsByClassName("file_tree");
    Array.from(fileTrees).forEach(fileTree => {
        addPlaceholder(fileTree, "Enter text");
        fileTree.addEventListener("input", () => { checkIfLastItemWasUsed(fileTree); });
    });
});

function addPlaceholder(fileTree, placeHolderText) {
    const items = fileTree.getElementsByTagName("li");
    if (items.length !== 0) {
        return;  // Do not add a placeholder if not empty
    }

    addItem(fileTree, placeHolderText);
}

function makeItem(fileTree, text) {
    // Make a new item, return a wrapper div with all buttons associated with the entry
    let wrapperDiv = document.createElement("div");
    wrapperDiv.classList.add("li_wrapper");

    let newItem = document.createElement("li");
    newItem.setAttribute("contenteditable", "true");
    if (text !== null) {
        newItem.textContent = text;
    }
    newItem.classList.add("item_text");
    newItem.addEventListener("input", () => { checkIfLastItemWasUsed(fileTree); });

    // Create a delete button with an image
    let deleteButton = document.createElement("img");
    deleteButton.setAttribute("src", "../static/images/Delete.svg");
    deleteButton.setAttribute("alt", "Delete");
    deleteButton.classList.add("item-button");
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => deleteItem(fileTree, wrapperDiv));

    // Create a full history button with an image
    let fullHistoryButton = document.createElement("img");
    fullHistoryButton.setAttribute("src", "../static/images/FullHistory.svg");
    fullHistoryButton.setAttribute("alt", "Full history");
    fullHistoryButton.classList.add("item-button");
    fullHistoryButton.classList.add("full-history-button");
    fullHistoryButton.addEventListener("click", () => showFullHistoryForItem(wrapperDiv));

    wrapperDiv.appendChild(deleteButton);
    wrapperDiv.appendChild(fullHistoryButton);
    wrapperDiv.appendChild(newItem);

    wrapperDiv.addEventListener("click", () => displaySelection(wrapperDiv))
    return wrapperDiv;
}

function displaySelection(itemWrapper) {
    console.log(`Selected wrapper ${itemWrapper}`)
}

function showFullHistoryForItem(itemWrapper) {
    // Add a child list underneath the itemWrapper of type ol, show previous versions
    // attach a listener to see if user clicks anywhere outside this list, if so close it.
    // if user selects an item from this list display it in itemWrapper
    return;
}

function checkIfLastItemWasUsed(fileTree) {
    const items = fileTree.getElementsByClassName("li_wrapper");
    let lastItem = items[items.length - 1];
    let liOfLastItem = lastItem.getElementsByClassName("item_text")[0]  // There is only one

    // Check if lastItem was entered text; if so, add a new item under it
    if (liOfLastItem.textContent.trim() !== "") {
        addItem(fileTree);  // Add a new item after it
    }
}


function addItem(fileTree, text) {
    const newItem = makeItem(fileTree, text);
    fileTree.appendChild(newItem);
    newItem.focus();
}

function deleteItem(fileTree, item) {
    const items = fileTree.getElementsByClassName("li_wrapper");

    if (items.length === 1) {
        let lastItem = items[0]
        let liOfLastItem = lastItem.getElementsByClassName("item_text")[0]  // There is only one

        liOfLastItem.textContent = "";  // Delete text content instead of deleting element
        return;
    }

    if (fileTree.contains(item)) {
        fileTree.removeChild(item);
        console.log(`Removed child from file list with value ${item.lastChild.textContent}`);
    }
}
