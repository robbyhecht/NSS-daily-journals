
// CONSTRUCTION ZONE... WORK IN PROGRESS 💀

// empty entries array
const journalEntries = []
// make added article tag into variable for dom placement
let entryLog = document.getElementsByClassName("entryLog");
// make inputs into variables
  let journalDate = document.getElementById("journalDate")
  let journalConcept = document.getElementById("journalConcept")
  let journalMood = document.getElementById("journalMood")
  let journalEntry = document.getElementById("journalEntry")

  // and create a new object with them
  let recentEntry = {
    concept: journalConcept.value,
    entry: journalEntry.value,
    mood: journalMood.value,
    date: journalDate.value
  }
  journalEntries.unshift(recentEntry)

console.log(journalEntries)

// ??

let makeJournalEntry = (journalEntries) => {
  for (i=0; i<journalEntries.length; i++) {
    let collection = `
    <h3>${journalEntries[i].concept}</h3>
    <p>${journalEntries[i].entry}</p>
    <p>${journalEntries[i].mood}</p>
    <p>${journalEntries[i].date}</p>
  `
  }
  return collection;
}

let entryObject = document.createElement("div");
let insert = () => entryObject.appendChild(collection);



// /*
//     Purpose: To render all journal entries to the DOM

//     Arguments: entries (array of objects)
// */
// const renderJournalEntries = (entries) => {

// }

// // Invoke the render function
// renderJournalEntries(journalEntries)