// Add event listeners to radio buttons to choose a mood
function moodFilter() {
  let moodButton = document.getElementsByName("moodButton")
  moodButton.forEach((button) => {
    button.addEventListener("click", event => {
      let moodType = event.target.value;
      console.log(moodType)
// Call filter function to display only selected entries and render to dom
      API.getJournalEntries()
      .then(entries => entries.filter((currentEntry)=> currentEntry.mood === moodType)).then(filteredEntries => renderDom.addJournalEntry(filteredEntries))
    })
  })
}