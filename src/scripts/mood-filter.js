import {API} from "./api-data"
import {RenderDom} from "./entriesToDOM"

// Add event listeners to radio buttons to choose a mood
export default class Mood {
    static moodFilter() {
    let moodButton = document.getElementsByName("moodButton")
    moodButton.forEach((button) => {
      button.addEventListener("click", event => {
        let moodType = event.target.value;
        console.log(moodType)
  // Call filter function to display only selected entries and render to dom
        API.getJournalEntries()
        .then(entries => entries.filter((currentEntry)=> currentEntry.mood === moodType)).then(filteredEntries => RenderDom.addJournalEntry(filteredEntries))
      })
    })
  }
}

// DID NOT JQUERY THIS PAGE BC COULDN'T MAKE IT WORK

// Replace element.addEventListener("click") with $("selector").click()
// Replace document.getElementById("id") with $("#id")
// Replace document.querySelector("selector") with $("selector")
// Replace element.innerHTML = htmlString with $().html(htmlString)
// Replace any code you have to obtain the value property of an input field with the jQuery .val() method.


// non jquery-refactored code:

// Add event listeners to radio buttons to choose a mood
// function moodFilter() {
//   let moodButton = document.getElementsByName("moodButton")
//   moodButton.forEach((button) => {
//     button.addEventListener("click", event => {
//       let moodType = event.target.value;
//       console.log(moodType)
// // Call filter function to display only selected entries and render to dom
//       API.getJournalEntries()
//       .then(entries => entries.filter((currentEntry)=> currentEntry.mood === moodType)).then(filteredEntries => renderDom.addJournalEntry(filteredEntries))
//     })
//   })
// }