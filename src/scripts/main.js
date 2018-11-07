
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