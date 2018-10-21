
// -- Still need to make work with input data --

// Array of existing journal entries
const journalEntries = [
  {
    date: "10/21/2018",
    concept: "Functions",
    entry: "Freakin functions. So functional!",
    mood: "getting there"
  },
  {
      date: "10/20/2018",
      concept: "Arrays",
      entry: "We learned about different array methods today. forEach made sense FINALLY",
      mood: "killer"
  }
];

// Make a variable for DOM placement from the empty article tag in index.html -- this is where the journal entries will appear in the browser.
const entryLog = document.querySelector(".entryLog");
// Q: why doesn't this work with getElementsByClassName?


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

// Call the function to activate the journal!
addJournalEntry(journalEntries);



// // make inputs into variables
//   let journalDate = document.querySelector("#journalDate")
//   let journalConcept = document.querySelector("#journalConcept")
//   let journalMood = document.querySelector("#journalMood")
//   let journalEntry = document.querySelector("#journalEntry")

//   // and create a new object with them
//   let recentEntry = {
//     concept: journalConcept.value,
//     entry: journalEntry.value,
//     mood: journalMood.value,
//     date: journalDate.value
//   }
//   journalEntries.unshift(recentEntry)

// console.log(journalEntries)

// // ??

// let entryObject = document.createElement("div");
// let insert = () => entryObject.appendChild(collection);

