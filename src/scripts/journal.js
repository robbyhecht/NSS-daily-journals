

// Make a variable for DOM placement from the empty article tag in index.html
// Q: why doesn't this work with getElementsByClassName?
const entryLog = document.querySelector(".entryLog");


// This function reformats the array's objects into user-friendly html for display in the DOM
let createJournalEntry = (entryObject) => {
  let htmlContent = `
    <section class="userEntry"> 
      <h2>${entryObject.concept}</h2>
      <p>${entryObject.entry}</p>
      <p><strong>Feelings check:</strong> ${entryObject.mood}</p>
      <p>${entryObject.date}</p> 
    </section>
    <hr>`
    return htmlContent;
}

// For each object in the array (aka each journal entry), transform the entry into html with the createJournalEntry function above and add it to the DOM's entryLog article
addJournalEntry = (entries) => {
  entries.forEach(entry => {
    entryLog.innerHTML += createJournalEntry(entry);
  });
}

// Fetch the array from the API and run it through the functions above to post objects to the dom

fetch("http://localhost:8088/entries") // Fetch from the API
    .then(entry => entry.json())  // Parse as JSON
    .then(entries => {
      createJournalEntry(entries)
        // What should happen when we finally have the array?
      addJournalEntry(entries)
    })