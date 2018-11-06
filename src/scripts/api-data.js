
// Make an object that holds the API call
const API = {

  getJournalEntries () {
    return fetch("http://localhost:8088/entries")
    .then(entryDataJson => entryDataJson.json())
    .then((entryData) => entryData)
  },

  saveJournalEntries (entry) {
    return fetch("http://localhost:8088/entries", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(entry)
    })
    .then((data) => data.json())
    .then(data => data)
  }

}





// // Fetch the array from the API and run it through the functions above to post objects to the dom

// fetch("http://localhost:8088/entries") // Fetch from the API
//     .then(entry => entry.json())  // Parse as JSON
//     .then(entries => {
//       createJournalEntry(entries)
//         // What should happen when we finally have the array?
//       addJournalEntry(entries)
//     })