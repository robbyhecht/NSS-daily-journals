
//1. Call the API object's function  2. Run the entries through the existing create and add functions  3. Creates and adds html to DOM

API.getJournalEntries()
.then(entries =>
  renderDom.addJournalEntry(entries)
)

let recordEntryButton = document.getElementById("recordEntryButton")
recordEntryButton.addEventListener("click", function() {
  
})

