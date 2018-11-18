import DomManager from "./entryComponentHtml"

// Make a variable for DOM placement from the empty article tag in index.html

// For each object in the array (aka each journal entry), transform the entry into html with the createJournalEntry function above and add it to the DOM's entryLog article
export default class RenderDom {
  addJournalEntry (entries) {
    const entryLog = document.querySelector(".entryLog");
    entryLog.innerHTML = ""
    entries.forEach(entry => {
      // calls the create function inside the add function
      entryLog.innerHTML += DomManager.createJournalEntry(entry);
    });
  }
}

// Replace element.addEventListener("click") with $("selector").click()
// Replace document.getElementById("id") with $("#id")
// Replace document.querySelector("selector") with $("selector")
// Replace element.innerHTML = htmlString with $().html(htmlString)
// Replace any code you have to obtain the value property of an input field with the jQuery .val() method.


// non jquery-refactored code:

// // Make a variable for DOM placement from the empty article tag in index.html
// // Q: why doesn't this work with getElementsByClassName?
// const entryLog = document.querySelector(".entryLog");

// // For each object in the array (aka each journal entry), transform the entry into html with the createJournalEntry function above and add it to the DOM's entryLog article
// const renderDom = {
//   addJournalEntry (entries) {
//     entryLog.innerHTML = ""
//     entries.forEach(entry => {
//       // calls the create function inside the add function
//       entryLog.innerHTML += domManager.createJournalEntry(entry);
//     });
//   }
// }