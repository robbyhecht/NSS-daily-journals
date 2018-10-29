// This function reformats the array's objects into user-friendly html for display in the DOM
const domManager = {
createJournalEntry (entryObject) {
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
}




// Change the code in both src/scripts/entriesDOM.js and src/scripts/entryComponent.js so that the functions in each one becomes a method on an object, just like the code for API does above. Use Object.create.

// When you are done, there should be three objects defined in your application.

// One object that has a method for API access
// One object that has a method for building a component
// One object that has a method rendering the components to the DOM
// Refactor: Once the objects are defined, refactor your code to use the methods on those objects where needed.


// old function composition:

// let createJournalEntry = (entryObject) => {
//   let htmlContent = `
//     <section class="userEntry"> 
//       <h2>${entryObject.concept}</h2>
//       <p>${entryObject.entry}</p>
//       <p><strong>Feelings check:</strong> ${entryObject.mood}</p>
//       <p>${entryObject.date}</p> 
//     </section>
//     <hr>`
//     return htmlContent;
// }