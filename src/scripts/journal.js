
// Call the API object's function
API.getJournalEntries()
// Run the entries through the existing create and add functions
.then(entries =>
  // Creates and adds html to DOM
  addJournalEntry(entries)
)





/*
    Main application logic that uses the functions and objects
    defined in the other JavaScript files.

    Change the fake variable names below to what they should be
    to get the data and display it.
*/

// objectWithGetterMethod.methodToGetData().then(functionThatRendersData)
