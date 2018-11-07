// Make a variable for DOM placement from the empty article tag in index.html
// Q: why doesn't this work with getElementsByClassName?
const entryLog = document.querySelector(".entryLog");

// For each object in the array (aka each journal entry), transform the entry into html with the createJournalEntry function above and add it to the DOM's entryLog article
const renderDom = {
  addJournalEntry (entries) {
    entryLog.innerHTML = ""
    entries.forEach(entry => {
      // calls the create function inside the add function
      entryLog.innerHTML += domManager.createJournalEntry(entry);
    });
  }
}