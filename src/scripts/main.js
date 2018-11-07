
//1. Call the API object's function  2. Run the entries through the existing create and add functions  3. Creates and adds html to DOM

API.getJournalEntries()
.then(entries => renderDom.addJournalEntry(entries))


let recordEntryButton = document.getElementById("recordEntryButton")
recordEntryButton.addEventListener("click", function() {
  let jdate = document.getElementById("journalDate").value
  let jconcept = document.getElementById("journalConcept").value
  let jentry = document.getElementById("journalEntry").value
  let jmood = document.getElementById("journalMood").value
  if (jdate === "" || jconcept === "" || jentry === "" || jmood === ""){
    alert("Please fill out the entire form!")
  }
  else {
    let newEntry = new Entry({
      date: jdate,
      concept: jconcept,
      entry: jentry,
      mood: jmood,
    })
    console.log(newEntry)
    newEntry.save()
    .then ( (data) => {
      console.log("new entry saved", data)
      return API.getJournalEntries()
    })
    .then(entries => renderDom.addJournalEntry(entries))
  }
})

// ---

let moodButton = document.getElementsByName("moodButton")
moodButton.forEach((button) => {
  moodButton.addEventListener("click", )
})

// Now, you could attach the event listeners to each individually. You could also use the document.getElementsByName() method, and a forEach() to add them more dynamically.

// To get the selected mood, you need to look at the value property of the radio button that was clicked. When you click on any DOM element, that element becomes the target of the click event. You can access the element, and its value with the code below.

// radioButton.addEventListener("click", event => {
//     const mood = event.target.value
// })