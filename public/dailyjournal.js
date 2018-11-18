(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// Make an object that holds the API call
class API {
  getJournalEntries() {
    return fetch("http://localhost:8088/entries").then(entryDataJson => entryDataJson.json()).then(entryData => entryData);
  }

  saveJournalEntries(entry) {
    console.log(entry);
    return fetch("http://localhost:8088/entries", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(entry)
    }).then(entryDataJson => entryDataJson.json()).then(entryData => entryData);
  }

} // // Fetch the array from the API and run it through the functions above to post objects to the dom
// fetch("http://localhost:8088/entries") // Fetch from the API
//     .then(entry => entry.json())  // Parse as JSON
//     .then(entries => {
//       createJournalEntry(entries)
//         // What should happen when we finally have the array?
//       addJournalEntry(entries)
//     })


exports.default = API;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _entryComponentHtml = _interopRequireDefault(require("./entryComponentHtml"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Make a variable for DOM placement from the empty article tag in index.html
// For each object in the array (aka each journal entry), transform the entry into html with the createJournalEntry function above and add it to the DOM's entryLog article
class RenderDom {
  addJournalEntry(entries) {
    const entryLog = document.querySelector(".entryLog");
    entryLog.innerHTML = "";
    entries.forEach(entry => {
      // calls the create function inside the add function
      entryLog.innerHTML += _entryComponentHtml.default.createJournalEntry(entry);
    });
  }

} // Replace element.addEventListener("click") with $("selector").click()
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


exports.default = RenderDom;

},{"./entryComponentHtml":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apiData = _interopRequireDefault(require("./api-data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Entry {
  constructor(props) {
    this.date = props.date;
    this.concept = props.concept;
    this.entry = props.entry;
    this.mood = props.mood;
  }

  get journalEntry() {
    return {
      date: this.date,
      concept: this.concept,
      entry: this.entry,
      mood: this.mood
    };
  }

  save() {
    return _apiData.default.saveJournalEntries(this.journalEntry);
  }

}

exports.default = Entry;

},{"./api-data":1}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// This function reformats the array's objects into user-friendly html for display in the DOM
class DomManager {
  createJournalEntry(entryObject) {
    let htmlContent = `
      <section class="userEntry" class="visibleWords"> 
        <h2>${entryObject.concept}</h2>
        <p>${entryObject.entry}</p>
        <p><strong>Feelings check:</strong> ${entryObject.mood}</p>
        <p>${entryObject.date}</p> 
      </section>
      <hr>`;
    return htmlContent;
  }

} // old function composition:
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


exports.default = DomManager;

},{}],5:[function(require,module,exports){
"use strict";

var _apiData = _interopRequireDefault(require("./api-data"));

var _entriesToDOM = _interopRequireDefault(require("./entriesToDOM"));

var _entryForm = _interopRequireDefault(require("./entry-form"));

var _moodFilter = _interopRequireDefault(require("./mood-filter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//1. Call the API object's function  2. Run the entries through the existing create and add functions  3. Creates and adds html to DOM
_apiData.default.getJournalEntries().then(entries => _entriesToDOM.default.addJournalEntry(entries));

let recordEntryButton = $("#recordEntryButton");
recordEntryButton.click(function () {
  let jdate = $("#journalDate").val();
  let jconcept = $("#journalConcept").val();
  let jentry = $("#journalEntry").val();
  let jmood = $("#journalMood").val();

  if (jdate === "" || jconcept === "" || jentry === "" || jmood === "") {
    alert("Please fill out the entire form!");
  } else {
    let newEntry = new _entryForm.default({
      date: jdate,
      concept: jconcept,
      entry: jentry,
      mood: jmood
    });
    console.log(newEntry);
    newEntry.save().then(data => {
      console.log("new entry saved", data);
      return _apiData.default.getJournalEntries();
    }).then(entries => _entriesToDOM.default.addJournalEntry(entries));
  }
}); // filter entries by mood selection

_moodFilter.default.moodFilter(); // // non jquery refactored code:
// //1. Call the API object's function  2. Run the entries through the existing create and add functions  3. Creates and adds html to DOM
// API.getJournalEntries()
// .then(entries => renderDom.addJournalEntry(entries))
// let recordEntryButton = document.getElementById("recordEntryButton")
// recordEntryButton.addEventListener("click", function() {
//   let jdate = document.getElementById("journalDate").value
//   let jconcept = document.getElementById("journalConcept").value
//   let jentry = document.getElementById("journalEntry").value
//   let jmood = document.getElementById("journalMood").value
//   if (jdate === "" || jconcept === "" || jentry === "" || jmood === ""){
//     alert("Please fill out the entire form!")
//   }
//   else {
//     let newEntry = new Entry({
//       date: jdate,
//       concept: jconcept,
//       entry: jentry,
//       mood: jmood,
//     })
//     console.log(newEntry)
//     newEntry.save()
//     .then ( (data) => {
//       console.log("new entry saved", data)
//       return API.getJournalEntries()
//     })
//     .then(entries => renderDom.addJournalEntry(entries))
//   }
// })
// // filter entries by mood selection
// moodFilter()

},{"./api-data":1,"./entriesToDOM":2,"./entry-form":3,"./mood-filter":6}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apiData = _interopRequireDefault(require("./api-data"));

var _entriesToDOM = _interopRequireDefault(require("./entriesToDOM"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Add event listeners to radio buttons to choose a mood
class Mood {
  moodFilter() {
    let moodButton = document.getElementsByName("moodButton");
    moodButton.forEach(button => {
      button.addEventListener("click", event => {
        let moodType = event.target.value;
        console.log(moodType); // Call filter function to display only selected entries and render to dom

        _apiData.default.getJournalEntries().then(entries => entries.filter(currentEntry => currentEntry.mood === moodType)).then(filteredEntries => _entriesToDOM.default.addJournalEntry(filteredEntries));
      });
    });
  }

} // DID NOT JQUERY THIS PAGE BC COULDN'T MAKE IT WORK
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


exports.default = Mood;

},{"./api-data":1,"./entriesToDOM":2}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2FwaS1kYXRhLmpzIiwiLi4vc2NyaXB0cy9lbnRyaWVzVG9ET00uanMiLCIuLi9zY3JpcHRzL2VudHJ5LWZvcm0uanMiLCIuLi9zY3JpcHRzL2VudHJ5Q29tcG9uZW50SHRtbC5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvbW9vZC1maWx0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDQ0E7QUFDZSxNQUFNLEdBQU4sQ0FBVTtBQUV2QixFQUFBLGlCQUFpQixHQUFJO0FBQ25CLFdBQU8sS0FBSyxDQUFDLCtCQUFELENBQUwsQ0FDTixJQURNLENBQ0QsYUFBYSxJQUFJLGFBQWEsQ0FBQyxJQUFkLEVBRGhCLEVBRU4sSUFGTSxDQUVBLFNBQUQsSUFBZSxTQUZkLENBQVA7QUFHRDs7QUFFRCxFQUFBLGtCQUFrQixDQUFFLEtBQUYsRUFBUztBQUN6QixJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksS0FBWjtBQUNBLFdBQU8sS0FBSyxDQUFDLCtCQUFELEVBQWtDO0FBQzVDLE1BQUEsTUFBTSxFQUFFLE1BRG9DO0FBRTVDLE1BQUEsT0FBTyxFQUFFO0FBQ1Asd0JBQWdCO0FBRFQsT0FGbUM7QUFLNUMsTUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQUwsQ0FBZSxLQUFmO0FBTHNDLEtBQWxDLENBQUwsQ0FPTixJQVBNLENBT0EsYUFBRCxJQUFtQixhQUFhLENBQUMsSUFBZCxFQVBsQixFQVFOLElBUk0sQ0FRQSxTQUFELElBQWUsU0FSZCxDQUFQO0FBU0Q7O0FBbkJzQixDLENBMEJ6QjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDcENBOzs7O0FBRUE7QUFFQTtBQUNlLE1BQU0sU0FBTixDQUFnQjtBQUM3QixFQUFBLGVBQWUsQ0FBRSxPQUFGLEVBQVc7QUFDeEIsVUFBTSxR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QjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXG4vLyBNYWtlIGFuIG9iamVjdCB0aGF0IGhvbGRzIHRoZSBBUEkgY2FsbFxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQVBJIHtcblxuICBnZXRKb3VybmFsRW50cmllcyAoKSB7XG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2VudHJpZXNcIilcbiAgICAudGhlbihlbnRyeURhdGFKc29uID0+IGVudHJ5RGF0YUpzb24uanNvbigpKVxuICAgIC50aGVuKChlbnRyeURhdGEpID0+IGVudHJ5RGF0YSlcbiAgfVxuXG4gIHNhdmVKb3VybmFsRW50cmllcyAoZW50cnkpIHtcbiAgICBjb25zb2xlLmxvZyhlbnRyeSlcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZW50cmllc1wiLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGVudHJ5KVxuICAgIH0pXG4gICAgLnRoZW4oKGVudHJ5RGF0YUpzb24pID0+IGVudHJ5RGF0YUpzb24uanNvbigpKVxuICAgIC50aGVuKChlbnRyeURhdGEpID0+IGVudHJ5RGF0YSlcbiAgfVxufVxuXG5cblxuXG5cbi8vIC8vIEZldGNoIHRoZSBhcnJheSBmcm9tIHRoZSBBUEkgYW5kIHJ1biBpdCB0aHJvdWdoIHRoZSBmdW5jdGlvbnMgYWJvdmUgdG8gcG9zdCBvYmplY3RzIHRvIHRoZSBkb21cblxuLy8gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZW50cmllc1wiKSAvLyBGZXRjaCBmcm9tIHRoZSBBUElcbi8vICAgICAudGhlbihlbnRyeSA9PiBlbnRyeS5qc29uKCkpICAvLyBQYXJzZSBhcyBKU09OXG4vLyAgICAgLnRoZW4oZW50cmllcyA9PiB7XG4vLyAgICAgICBjcmVhdGVKb3VybmFsRW50cnkoZW50cmllcylcbi8vICAgICAgICAgLy8gV2hhdCBzaG91bGQgaGFwcGVuIHdoZW4gd2UgZmluYWxseSBoYXZlIHRoZSBhcnJheT9cbi8vICAgICAgIGFkZEpvdXJuYWxFbnRyeShlbnRyaWVzKVxuLy8gICAgIH0pIiwiaW1wb3J0IERvbU1hbmFnZXIgZnJvbSBcIi4vZW50cnlDb21wb25lbnRIdG1sXCJcblxuLy8gTWFrZSBhIHZhcmlhYmxlIGZvciBET00gcGxhY2VtZW50IGZyb20gdGhlIGVtcHR5IGFydGljbGUgdGFnIGluIGluZGV4Lmh0bWxcblxuLy8gRm9yIGVhY2ggb2JqZWN0IGluIHRoZSBhcnJheSAoYWthIGVhY2ggam91cm5hbCBlbnRyeSksIHRyYW5zZm9ybSB0aGUgZW50cnkgaW50byBodG1sIHdpdGggdGhlIGNyZWF0ZUpvdXJuYWxFbnRyeSBmdW5jdGlvbiBhYm92ZSBhbmQgYWRkIGl0IHRvIHRoZSBET00ncyBlbnRyeUxvZyBhcnRpY2xlXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW5kZXJEb20ge1xuICBhZGRKb3VybmFsRW50cnkgKGVudHJpZXMpIHtcbiAgICBjb25zdCBlbnRyeUxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZW50cnlMb2dcIik7XG4gICAgZW50cnlMb2cuaW5uZXJIVE1MID0gXCJcIlxuICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICAvLyBjYWxscyB0aGUgY3JlYXRlIGZ1bmN0aW9uIGluc2lkZSB0aGUgYWRkIGZ1bmN0aW9uXG4gICAgICBlbnRyeUxvZy5pbm5lckhUTUwgKz0gRG9tTWFuYWdlci5jcmVhdGVKb3VybmFsRW50cnkoZW50cnkpO1xuICAgIH0pO1xuICB9XG59XG5cbi8vIFJlcGxhY2UgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIikgd2l0aCAkKFwic2VsZWN0b3JcIikuY2xpY2soKVxuLy8gUmVwbGFjZSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImlkXCIpIHdpdGggJChcIiNpZFwiKVxuLy8gUmVwbGFjZSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwic2VsZWN0b3JcIikgd2l0aCAkKFwic2VsZWN0b3JcIilcbi8vIFJlcGxhY2UgZWxlbWVudC5pbm5lckhUTUwgPSBodG1sU3RyaW5nIHdpdGggJCgpLmh0bWwoaHRtbFN0cmluZylcbi8vIFJlcGxhY2UgYW55IGNvZGUgeW91IGhhdmUgdG8gb2J0YWluIHRoZSB2YWx1ZSBwcm9wZXJ0eSBvZiBhbiBpbnB1dCBmaWVsZCB3aXRoIHRoZSBqUXVlcnkgLnZhbCgpIG1ldGhvZC5cblxuXG4vLyBub24ganF1ZXJ5LXJlZmFjdG9yZWQgY29kZTpcblxuLy8gLy8gTWFrZSBhIHZhcmlhYmxlIGZvciBET00gcGxhY2VtZW50IGZyb20gdGhlIGVtcHR5IGFydGljbGUgdGFnIGluIGluZGV4Lmh0bWxcbi8vIC8vIFE6IHdoeSBkb2Vzbid0IHRoaXMgd29yayB3aXRoIGdldEVsZW1lbnRzQnlDbGFzc05hbWU/XG4vLyBjb25zdCBlbnRyeUxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZW50cnlMb2dcIik7XG5cbi8vIC8vIEZvciBlYWNoIG9iamVjdCBpbiB0aGUgYXJyYXkgKGFrYSBlYWNoIGpvdXJuYWwgZW50cnkpLCB0cmFuc2Zvcm0gdGhlIGVudHJ5IGludG8gaHRtbCB3aXRoIHRoZSBjcmVhdGVKb3VybmFsRW50cnkgZnVuY3Rpb24gYWJvdmUgYW5kIGFkZCBpdCB0byB0aGUgRE9NJ3MgZW50cnlMb2cgYXJ0aWNsZVxuLy8gY29uc3QgcmVuZGVyRG9tID0ge1xuLy8gICBhZGRKb3VybmFsRW50cnkgKGVudHJpZXMpIHtcbi8vICAgICBlbnRyeUxvZy5pbm5lckhUTUwgPSBcIlwiXG4vLyAgICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbi8vICAgICAgIC8vIGNhbGxzIHRoZSBjcmVhdGUgZnVuY3Rpb24gaW5zaWRlIHRoZSBhZGQgZnVuY3Rpb25cbi8vICAgICAgIGVudHJ5TG9nLmlubmVySFRNTCArPSBkb21NYW5hZ2VyLmNyZWF0ZUpvdXJuYWxFbnRyeShlbnRyeSk7XG4vLyAgICAgfSk7XG4vLyAgIH1cbi8vIH0iLCJpbXBvcnQgQVBJIGZyb20gXCIuL2FwaS1kYXRhXCJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudHJ5IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHRoaXMuZGF0ZSA9IHByb3BzLmRhdGVcbiAgICB0aGlzLmNvbmNlcHQgPSBwcm9wcy5jb25jZXB0XG4gICAgdGhpcy5lbnRyeSA9IHByb3BzLmVudHJ5XG4gICAgdGhpcy5tb29kID0gcHJvcHMubW9vZFxuICB9XG5cbiAgZ2V0IGpvdXJuYWxFbnRyeSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZGF0ZTogdGhpcy5kYXRlLFxuICAgICAgY29uY2VwdDogdGhpcy5jb25jZXB0LFxuICAgICAgZW50cnk6IHRoaXMuZW50cnksXG4gICAgICBtb29kOiB0aGlzLm1vb2RcbiAgICB9XG4gIH1cblxuICBzYXZlICgpIHtcbiAgICByZXR1cm4gQVBJLnNhdmVKb3VybmFsRW50cmllcyh0aGlzLmpvdXJuYWxFbnRyeSlcbiAgfVxuXG59IiwiLy8gVGhpcyBmdW5jdGlvbiByZWZvcm1hdHMgdGhlIGFycmF5J3Mgb2JqZWN0cyBpbnRvIHVzZXItZnJpZW5kbHkgaHRtbCBmb3IgZGlzcGxheSBpbiB0aGUgRE9NXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21NYW5hZ2VyIHtcbiAgY3JlYXRlSm91cm5hbEVudHJ5IChlbnRyeU9iamVjdCkge1xuICAgIGxldCBodG1sQ29udGVudCA9IGBcbiAgICAgIDxzZWN0aW9uIGNsYXNzPVwidXNlckVudHJ5XCIgY2xhc3M9XCJ2aXNpYmxlV29yZHNcIj4gXG4gICAgICAgIDxoMj4ke2VudHJ5T2JqZWN0LmNvbmNlcHR9PC9oMj5cbiAgICAgICAgPHA+JHtlbnRyeU9iamVjdC5lbnRyeX08L3A+XG4gICAgICAgIDxwPjxzdHJvbmc+RmVlbGluZ3MgY2hlY2s6PC9zdHJvbmc+ICR7ZW50cnlPYmplY3QubW9vZH08L3A+XG4gICAgICAgIDxwPiR7ZW50cnlPYmplY3QuZGF0ZX08L3A+IFxuICAgICAgPC9zZWN0aW9uPlxuICAgICAgPGhyPmBcbiAgICByZXR1cm4gaHRtbENvbnRlbnQ7XG4gIH1cbn1cblxuLy8gb2xkIGZ1bmN0aW9uIGNvbXBvc2l0aW9uOlxuXG4vLyBsZXQgY3JlYXRlSm91cm5hbEVudHJ5ID0gKGVudHJ5T2JqZWN0KSA9PiB7XG4vLyAgIGxldCBodG1sQ29udGVudCA9IGBcbi8vICAgICA8c2VjdGlvbiBjbGFzcz1cInVzZXJFbnRyeVwiPiBcbi8vICAgICAgIDxoMj4ke2VudHJ5T2JqZWN0LmNvbmNlcHR9PC9oMj5cbi8vICAgICAgIDxwPiR7ZW50cnlPYmplY3QuZW50cnl9PC9wPlxuLy8gICAgICAgPHA+PHN0cm9uZz5GZWVsaW5ncyBjaGVjazo8L3N0cm9uZz4gJHtlbnRyeU9iamVjdC5tb29kfTwvcD5cbi8vICAgICAgIDxwPiR7ZW50cnlPYmplY3QuZGF0ZX08L3A+IFxuLy8gICAgIDwvc2VjdGlvbj5cbi8vICAgICA8aHI+YFxuLy8gICAgIHJldHVybiBodG1sQ29udGVudDtcbi8vIH0iLCJcbmltcG9ydCBBUEkgZnJvbSBcIi4vYXBpLWRhdGFcIlxuaW1wb3J0IFJlbmRlckRvbSBmcm9tIFwiLi9lbnRyaWVzVG9ET01cIlxuaW1wb3J0IEVudHJ5IGZyb20gXCIuL2VudHJ5LWZvcm1cIlxuaW1wb3J0IE1vb2QgZnJvbSBcIi4vbW9vZC1maWx0ZXJcIlxuXG4vLzEuIENhbGwgdGhlIEFQSSBvYmplY3QncyBmdW5jdGlvbiAgMi4gUnVuIHRoZSBlbnRyaWVzIHRocm91Z2ggdGhlIGV4aXN0aW5nIGNyZWF0ZSBhbmQgYWRkIGZ1bmN0aW9ucyAgMy4gQ3JlYXRlcyBhbmQgYWRkcyBodG1sIHRvIERPTVxuXG5BUEkuZ2V0Sm91cm5hbEVudHJpZXMoKVxuLnRoZW4oZW50cmllcyA9PiBSZW5kZXJEb20uYWRkSm91cm5hbEVudHJ5KGVudHJpZXMpKVxuXG5sZXQgcmVjb3JkRW50cnlCdXR0b24gPSAkKFwiI3JlY29yZEVudHJ5QnV0dG9uXCIpXG5yZWNvcmRFbnRyeUJ1dHRvbi5jbGljayhmdW5jdGlvbigpIHtcbiAgbGV0IGpkYXRlID0gJChcIiNqb3VybmFsRGF0ZVwiKS52YWwoKVxuICBsZXQgamNvbmNlcHQgPSAkKFwiI2pvdXJuYWxDb25jZXB0XCIpLnZhbCgpXG4gIGxldCBqZW50cnkgPSAkKFwiI2pvdXJuYWxFbnRyeVwiKS52YWwoKVxuICBsZXQgam1vb2QgPSAkKFwiI2pvdXJuYWxNb29kXCIpLnZhbCgpXG5cbiAgaWYgKGpkYXRlID09PSBcIlwiIHx8IGpjb25jZXB0ID09PSBcIlwiIHx8IGplbnRyeSA9PT0gXCJcIiB8fCBqbW9vZCA9PT0gXCJcIil7XG4gICAgYWxlcnQoXCJQbGVhc2UgZmlsbCBvdXQgdGhlIGVudGlyZSBmb3JtIVwiKVxuICB9XG4gIGVsc2Uge1xuICAgIGxldCBuZXdFbnRyeSA9IG5ldyBFbnRyeSh7XG4gICAgICBkYXRlOiBqZGF0ZSxcbiAgICAgIGNvbmNlcHQ6IGpjb25jZXB0LFxuICAgICAgZW50cnk6IGplbnRyeSxcbiAgICAgIG1vb2Q6IGptb29kLFxuICAgIH0pXG4gICAgY29uc29sZS5sb2cobmV3RW50cnkpXG4gICAgbmV3RW50cnkuc2F2ZSgpXG4gICAgLnRoZW4gKCAoZGF0YSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJuZXcgZW50cnkgc2F2ZWRcIiwgZGF0YSlcbiAgICAgIHJldHVybiBBUEkuZ2V0Sm91cm5hbEVudHJpZXMoKVxuICAgIH0pXG4gICAgLnRoZW4oZW50cmllcyA9PiBSZW5kZXJEb20uYWRkSm91cm5hbEVudHJ5KGVudHJpZXMpKVxuICB9XG59KVxuXG4vLyBmaWx0ZXIgZW50cmllcyBieSBtb29kIHNlbGVjdGlvblxuXG5Nb29kLm1vb2RGaWx0ZXIoKVxuXG4vLyAvLyBub24ganF1ZXJ5IHJlZmFjdG9yZWQgY29kZTpcblxuLy8gLy8xLiBDYWxsIHRoZSBBUEkgb2JqZWN0J3MgZnVuY3Rpb24gIDIuIFJ1biB0aGUgZW50cmllcyB0aHJvdWdoIHRoZSBleGlzdGluZyBjcmVhdGUgYW5kIGFkZCBmdW5jdGlvbnMgIDMuIENyZWF0ZXMgYW5kIGFkZHMgaHRtbCB0byBET01cblxuLy8gQVBJLmdldEpvdXJuYWxFbnRyaWVzKClcbi8vIC50aGVuKGVudHJpZXMgPT4gcmVuZGVyRG9tLmFkZEpvdXJuYWxFbnRyeShlbnRyaWVzKSlcblxuXG4vLyBsZXQgcmVjb3JkRW50cnlCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlY29yZEVudHJ5QnV0dG9uXCIpXG4vLyByZWNvcmRFbnRyeUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4vLyAgIGxldCBqZGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiam91cm5hbERhdGVcIikudmFsdWVcbi8vICAgbGV0IGpjb25jZXB0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqb3VybmFsQ29uY2VwdFwiKS52YWx1ZVxuLy8gICBsZXQgamVudHJ5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqb3VybmFsRW50cnlcIikudmFsdWVcbi8vICAgbGV0IGptb29kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqb3VybmFsTW9vZFwiKS52YWx1ZVxuLy8gICBpZiAoamRhdGUgPT09IFwiXCIgfHwgamNvbmNlcHQgPT09IFwiXCIgfHwgamVudHJ5ID09PSBcIlwiIHx8IGptb29kID09PSBcIlwiKXtcbi8vICAgICBhbGVydChcIlBsZWFzZSBmaWxsIG91dCB0aGUgZW50aXJlIGZvcm0hXCIpXG4vLyAgIH1cbi8vICAgZWxzZSB7XG4vLyAgICAgbGV0IG5ld0VudHJ5ID0gbmV3IEVudHJ5KHtcbi8vICAgICAgIGRhdGU6IGpkYXRlLFxuLy8gICAgICAgY29uY2VwdDogamNvbmNlcHQsXG4vLyAgICAgICBlbnRyeTogamVudHJ5LFxuLy8gICAgICAgbW9vZDogam1vb2QsXG4vLyAgICAgfSlcbi8vICAgICBjb25zb2xlLmxvZyhuZXdFbnRyeSlcbi8vICAgICBuZXdFbnRyeS5zYXZlKClcbi8vICAgICAudGhlbiAoIChkYXRhKSA9PiB7XG4vLyAgICAgICBjb25zb2xlLmxvZyhcIm5ldyBlbnRyeSBzYXZlZFwiLCBkYXRhKVxuLy8gICAgICAgcmV0dXJuIEFQSS5nZXRKb3VybmFsRW50cmllcygpXG4vLyAgICAgfSlcbi8vICAgICAudGhlbihlbnRyaWVzID0+IHJlbmRlckRvbS5hZGRKb3VybmFsRW50cnkoZW50cmllcykpXG4vLyAgIH1cbi8vIH0pXG5cbi8vIC8vIGZpbHRlciBlbnRyaWVzIGJ5IG1vb2Qgc2VsZWN0aW9uXG5cbi8vIG1vb2RGaWx0ZXIoKSIsImltcG9ydCBBUEkgZnJvbSBcIi4vYXBpLWRhdGFcIlxuaW1wb3J0IFJlbmRlckRvbSBmcm9tIFwiLi9lbnRyaWVzVG9ET01cIlxuXG4vLyBBZGQgZXZlbnQgbGlzdGVuZXJzIHRvIHJhZGlvIGJ1dHRvbnMgdG8gY2hvb3NlIGEgbW9vZFxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9vZCB7XG4gICAgbW9vZEZpbHRlcigpIHtcbiAgICBsZXQgbW9vZEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKFwibW9vZEJ1dHRvblwiKVxuICAgIG1vb2RCdXR0b24uZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50ID0+IHtcbiAgICAgICAgbGV0IG1vb2RUeXBlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICBjb25zb2xlLmxvZyhtb29kVHlwZSlcbiAgLy8gQ2FsbCBmaWx0ZXIgZnVuY3Rpb24gdG8gZGlzcGxheSBvbmx5IHNlbGVjdGVkIGVudHJpZXMgYW5kIHJlbmRlciB0byBkb21cbiAgICAgICAgQVBJLmdldEpvdXJuYWxFbnRyaWVzKClcbiAgICAgICAgLnRoZW4oZW50cmllcyA9PiBlbnRyaWVzLmZpbHRlcigoY3VycmVudEVudHJ5KT0+IGN1cnJlbnRFbnRyeS5tb29kID09PSBtb29kVHlwZSkpLnRoZW4oZmlsdGVyZWRFbnRyaWVzID0+IFJlbmRlckRvbS5hZGRKb3VybmFsRW50cnkoZmlsdGVyZWRFbnRyaWVzKSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuXG4vLyBESUQgTk9UIEpRVUVSWSBUSElTIFBBR0UgQkMgQ09VTEROJ1QgTUFLRSBJVCBXT1JLXG5cbi8vIFJlcGxhY2UgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIikgd2l0aCAkKFwic2VsZWN0b3JcIikuY2xpY2soKVxuLy8gUmVwbGFjZSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImlkXCIpIHdpdGggJChcIiNpZFwiKVxuLy8gUmVwbGFjZSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwic2VsZWN0b3JcIikgd2l0aCAkKFwic2VsZWN0b3JcIilcbi8vIFJlcGxhY2UgZWxlbWVudC5pbm5lckhUTUwgPSBodG1sU3RyaW5nIHdpdGggJCgpLmh0bWwoaHRtbFN0cmluZylcbi8vIFJlcGxhY2UgYW55IGNvZGUgeW91IGhhdmUgdG8gb2J0YWluIHRoZSB2YWx1ZSBwcm9wZXJ0eSBvZiBhbiBpbnB1dCBmaWVsZCB3aXRoIHRoZSBqUXVlcnkgLnZhbCgpIG1ldGhvZC5cblxuXG4vLyBub24ganF1ZXJ5LXJlZmFjdG9yZWQgY29kZTpcblxuLy8gQWRkIGV2ZW50IGxpc3RlbmVycyB0byByYWRpbyBidXR0b25zIHRvIGNob29zZSBhIG1vb2Rcbi8vIGZ1bmN0aW9uIG1vb2RGaWx0ZXIoKSB7XG4vLyAgIGxldCBtb29kQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoXCJtb29kQnV0dG9uXCIpXG4vLyAgIG1vb2RCdXR0b24uZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4vLyAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudCA9PiB7XG4vLyAgICAgICBsZXQgbW9vZFR5cGUgPSBldmVudC50YXJnZXQudmFsdWU7XG4vLyAgICAgICBjb25zb2xlLmxvZyhtb29kVHlwZSlcbi8vIC8vIENhbGwgZmlsdGVyIGZ1bmN0aW9uIHRvIGRpc3BsYXkgb25seSBzZWxlY3RlZCBlbnRyaWVzIGFuZCByZW5kZXIgdG8gZG9tXG4vLyAgICAgICBBUEkuZ2V0Sm91cm5hbEVudHJpZXMoKVxuLy8gICAgICAgLnRoZW4oZW50cmllcyA9PiBlbnRyaWVzLmZpbHRlcigoY3VycmVudEVudHJ5KT0+IGN1cnJlbnRFbnRyeS5tb29kID09PSBtb29kVHlwZSkpLnRoZW4oZmlsdGVyZWRFbnRyaWVzID0+IHJlbmRlckRvbS5hZGRKb3VybmFsRW50cnkoZmlsdGVyZWRFbnRyaWVzKSlcbi8vICAgICB9KVxuLy8gICB9KVxuLy8gfSJdfQ==
