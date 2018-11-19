// This function reformats the array's objects into user-friendly html for display in the DOM
const DomManager = {
  createJournalEntry: (entryObject) => {
    let htmlContent = `
      <section class="userEntry" class="visibleWords"> 
        <h2>${entryObject.concept}</h2>
        <p>${entryObject.entry}</p>
        <p><strong>Feelings check:</strong> ${entryObject.mood}</p>
        <p>${entryObject.date}</p> 
      </section>
      <hr>`
    return htmlContent;
  }
}

export {DomManager}

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