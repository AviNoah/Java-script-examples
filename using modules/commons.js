// When making commons into a module, it is no longer included in the GLOBAL scope.
// it is now included in a local scope, any constants I declare here will be trashed.
// Only variables declared WITHIN the exported function scope can be used.
const d = "Unusable by exported function";

export function add(a, b) {
    const c = "Useable by exported function";
    console.log(d);
    console.log(c);
    return a + b;
}