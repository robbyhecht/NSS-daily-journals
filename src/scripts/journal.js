
//1. Call the API object's function  2. Run the entries through the existing create and add functions  3. Creates and adds html to DOM

API.getJournalEntries()
.then(entries =>
  renderDom.addJournalEntry(entries)
)








// Change the code in both src/scripts/entriesDOM.js and src/scripts/entryComponent.js so that the functions in each one becomes a method on an object, just like the code for API does above. Use Object.create.

// When you are done, there should be three objects defined in your application.

// One object that has a method for API access
// One object that has a method for building a component
// One object that has a method rendering the components to the DOM
// Refactor: Once the objects are defined, refactor your code to use the methods on those objects where needed.