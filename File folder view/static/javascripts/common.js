export function removeElementFromContainer(container, element, cfmMsg) {
    const choice = confirm(cfmMsg);

    if (choice && container.contains(element)) {
        container.removeChild(element);
        console.log(`User deleted ${element}`);
    }
}
