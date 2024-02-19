// Since we want to import add from commons, we MUST make scriptA a module as well.
// Meaning scriptA will load only after all DOM objects finish loading.
// Since our span needs its onClick to be DoSomething from scriptA, we need to export it to expose it
// to the global scope.

import { add } from "./commons.js";

function DoSomething() {
    // Since we are exposing only DoSomething to the global scope, we must define the span constant here!
    const spanEl = document.getElementById('clickableSpan');
    console.log("Something happened!");
    spanEl.textContent = add(3, 2);
}

// Now we expose DoSomething to the global scope
export { DoSomething };