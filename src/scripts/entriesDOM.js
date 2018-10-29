// Make a variable for DOM placement from the empty article tag in index.html
// Q: why doesn't this work with getElementsByClassName?
const entryLog = document.querySelector(".entryLog");

// For each object in the array (aka each journal entry), transform the entry into html with the createJournalEntry function above and add it to the DOM's entryLog article
const renderDom = {
  addJournalEntry (entries) {
    entries.forEach(entry => {
      // calls the create function inside the add function
      entryLog.innerHTML += domManager.createJournalEntry(entry);
    });
  }
}




// Change the code in both src/scripts/entriesDOM.js and src/scripts/entryComponent.js so that the functions in each one becomes a method on an object, just like the code for API does above. Use Object.create.

// When you are done, there should be three objects defined in your application.

// One object that has a method for API access
// One object that has a method for building a component
// One object that has a method rendering the components to the DOM
// Refactor: Once the objects are defined, refactor your code to use the methods on those objects where needed.