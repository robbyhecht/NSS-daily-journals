(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.API = void 0;
// Make an object that holds the API call
const API = {
  getJournalEntries: () => {
    return fetch("http://localhost:8088/entries").then(entryDataJson => entryDataJson.json()); // .then((entryData) => entryData)
  },
  saveJournalEntries: entry => {
    console.log(entry);
    return fetch("http://localhost:8088/entries", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(entry)
    }).then(entryDataJson => entryDataJson.json()).then(entryData => entryData);
  }
}; // // Fetch the array from the API and run it through the functions above to post objects to the dom
// fetch("http://localhost:8088/entries") // Fetch from the API
//     .then(entry => entry.json())  // Parse as JSON
//     .then(entries => {
//       createJournalEntry(entries)
//         // What should happen when we finally have the array?
//       addJournalEntry(entries)
//     })

exports.API = API;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderDom = void 0;

var _entryComponentHtml = require("./entryComponentHtml");

// Make a variable for DOM placement from the empty article tag in index.html
// For each object in the array (aka each journal entry), transform the entry into html with the createJournalEntry function above and add it to the DOM's entryLog article
const RenderDom = {
  addJournalEntry: entries => {
    const entryLog = document.querySelector(".entryLog");
    entryLog.innerHTML = "";
    entries.forEach(entry => {
      // calls the create function inside the add function
      entryLog.innerHTML += _entryComponentHtml.DomManager.createJournalEntry(entry);
    });
  }
}; // Replace element.addEventListener("click") with $("selector").click()
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

exports.RenderDom = RenderDom;

},{"./entryComponentHtml":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apiData = require("./api-data");

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
    return _apiData.API.saveJournalEntries(this.journalEntry);
  }

}

exports.default = Entry;

},{"./api-data":1}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DomManager = void 0;
// This function reformats the array's objects into user-friendly html for display in the DOM
const DomManager = {
  createJournalEntry: entryObject => {
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
}; // old function composition:
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

exports.DomManager = DomManager;

},{}],5:[function(require,module,exports){
"use strict";

var _apiData = require("./api-data");

var _entriesToDOM = require("./entriesToDOM");

var _entryForm = _interopRequireDefault(require("./entry-form"));

var _moodFilter = _interopRequireDefault(require("./mood-filter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//1. Call the API object's function  2. Run the entries through the existing create and add functions  3. Creates and adds html to DOM
_apiData.API.getJournalEntries().then(entries => _entriesToDOM.RenderDom.addJournalEntry(entries));

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
      return _apiData.API.getJournalEntries();
    }).then(entries => _entriesToDOM.RenderDom.addJournalEntry(entries));
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

var _apiData = require("./api-data");

var _entriesToDOM = require("./entriesToDOM");

// Add event listeners to radio buttons to choose a mood
class Mood {
  static moodFilter() {
    let moodButton = document.getElementsByName("moodButton");
    moodButton.forEach(button => {
      button.addEventListener("click", event => {
        let moodType = event.target.value;
        console.log(moodType); // Call filter function to display only selected entries and render to dom

        _apiData.API.getJournalEntries().then(entries => entries.filter(currentEntry => currentEntry.mood === moodType)).then(filteredEntries => _entriesToDOM.RenderDom.addJournalEntry(filteredEntries));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2FwaS1kYXRhLmpzIiwiLi4vc2NyaXB0cy9lbnRyaWVzVG9ET00uanMiLCIuLi9zY3JpcHRzL2VudHJ5LWZvcm0uanMiLCIuLi9zY3JpcHRzL2VudHJ5Q29tcG9uZW50SHRtbC5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvbW9vZC1maWx0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNDQTtBQUNBLE1BQU0sR0FBRyxHQUFHO0FBRVYsRUFBQSxpQkFBaUIsRUFBRSxNQUFLO0FBQ3RCLFdBQU8sS0FBSyxDQUFDLCtCQUFELENBQUwsQ0FDTixJQURNLENBQ0QsYUFBYSxJQUFJLGFBQWEsQ0FBQyxJQUFkLEVBRGhCLENBQVAsQ0FEc0IsQ0FHdEI7QUFDRCxHQU5TO0FBUVYsRUFBQSxrQkFBa0IsRUFBRyxLQUFELElBQVU7QUFDNUIsSUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLEtBQVo7QUFDQSxXQUFPLEtBQUssQ0FBQywrQkFBRCxFQUFrQztBQUM1QyxNQUFBLE1BQU0sRUFBRSxNQURvQztBQUU1QyxNQUFBLE9BQU8sRUFBRTtBQUNQLHdCQUFnQjtBQURULE9BRm1DO0FBSzVDLE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsS0FBZjtBQUxzQyxLQUFsQyxDQUFMLENBT04sSUFQTSxDQU9BLGFBQUQsSUFBbUIsYUFBYSxDQUFDLElBQWQsRUFQbEIsRUFRTixJQVJNLENBUUEsU0FBRCxJQUFlLFNBUmQsQ0FBUDtBQVNEO0FBbkJTLENBQVosQyxDQTRCQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN0Q0E7O0FBRUE7QUFFQTtBQUNBLE1BQU0sU0FBUyxHQUFHO0FBQ2hCLEVBQUEsZUFBZSxFQUFHLE9BQUQsSUFBYTtBQUM1QixVQUFNLFFBQVEsR0FBRyxRQUFR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QUNBO0FBQ0E7QUFDQTtBQUdBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcbi8vIE1ha2UgYW4gb2JqZWN0IHRoYXQgaG9sZHMgdGhlIEFQSSBjYWxsXG5jb25zdCBBUEkgPSB7XG5cbiAgZ2V0Sm91cm5hbEVudHJpZXM6ICgpPT4ge1xuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9lbnRyaWVzXCIpXG4gICAgLnRoZW4oZW50cnlEYXRhSnNvbiA9PiBlbnRyeURhdGFKc29uLmpzb24oKSlcbiAgICAvLyAudGhlbigoZW50cnlEYXRhKSA9PiBlbnRyeURhdGEpXG4gIH0sXG5cbiAgc2F2ZUpvdXJuYWxFbnRyaWVzOiAoZW50cnkpPT4ge1xuICAgIGNvbnNvbGUubG9nKGVudHJ5KVxuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9lbnRyaWVzXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZW50cnkpXG4gICAgfSlcbiAgICAudGhlbigoZW50cnlEYXRhSnNvbikgPT4gZW50cnlEYXRhSnNvbi5qc29uKCkpXG4gICAgLnRoZW4oKGVudHJ5RGF0YSkgPT4gZW50cnlEYXRhKVxuICB9XG59XG5cbmV4cG9ydCB7QVBJfVxuXG5cblxuXG5cbi8vIC8vIEZldGNoIHRoZSBhcnJheSBmcm9tIHRoZSBBUEkgYW5kIHJ1biBpdCB0aHJvdWdoIHRoZSBmdW5jdGlvbnMgYWJvdmUgdG8gcG9zdCBvYmplY3RzIHRvIHRoZSBkb21cblxuLy8gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZW50cmllc1wiKSAvLyBGZXRjaCBmcm9tIHRoZSBBUElcbi8vICAgICAudGhlbihlbnRyeSA9PiBlbnRyeS5qc29uKCkpICAvLyBQYXJzZSBhcyBKU09OXG4vLyAgICAgLnRoZW4oZW50cmllcyA9PiB7XG4vLyAgICAgICBjcmVhdGVKb3VybmFsRW50cnkoZW50cmllcylcbi8vICAgICAgICAgLy8gV2hhdCBzaG91bGQgaGFwcGVuIHdoZW4gd2UgZmluYWxseSBoYXZlIHRoZSBhcnJheT9cbi8vICAgICAgIGFkZEpvdXJuYWxFbnRyeShlbnRyaWVzKVxuLy8gICAgIH0pIiwiaW1wb3J0IHtEb21NYW5hZ2VyfSBmcm9tIFwiLi9lbnRyeUNvbXBvbmVudEh0bWxcIlxuXG4vLyBNYWtlIGEgdmFyaWFibGUgZm9yIERPTSBwbGFjZW1lbnQgZnJvbSB0aGUgZW1wdHkgYXJ0aWNsZSB0YWcgaW4gaW5kZXguaHRtbFxuXG4vLyBGb3IgZWFjaCBvYmplY3QgaW4gdGhlIGFycmF5IChha2EgZWFjaCBqb3VybmFsIGVudHJ5KSwgdHJhbnNmb3JtIHRoZSBlbnRyeSBpbnRvIGh0bWwgd2l0aCB0aGUgY3JlYXRlSm91cm5hbEVudHJ5IGZ1bmN0aW9uIGFib3ZlIGFuZCBhZGQgaXQgdG8gdGhlIERPTSdzIGVudHJ5TG9nIGFydGljbGVcbmNvbnN0IFJlbmRlckRvbSA9IHtcbiAgYWRkSm91cm5hbEVudHJ5OiAoZW50cmllcykgPT4ge1xuICAgIGNvbnN0IGVudHJ5TG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lbnRyeUxvZ1wiKTtcbiAgICBlbnRyeUxvZy5pbm5lckhUTUwgPSBcIlwiXG4gICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgIC8vIGNhbGxzIHRoZSBjcmVhdGUgZnVuY3Rpb24gaW5zaWRlIHRoZSBhZGQgZnVuY3Rpb25cbiAgICAgIGVudHJ5TG9nLmlubmVySFRNTCArPSBEb21NYW5hZ2VyLmNyZWF0ZUpvdXJuYWxFbnRyeShlbnRyeSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IHtSZW5kZXJEb219XG5cbi8vIFJlcGxhY2UgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIikgd2l0aCAkKFwic2VsZWN0b3JcIikuY2xpY2soKVxuLy8gUmVwbGFjZSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImlkXCIpIHdpdGggJChcIiNpZFwiKVxuLy8gUmVwbGFjZSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwic2VsZWN0b3JcIikgd2l0aCAkKFwic2VsZWN0b3JcIilcbi8vIFJlcGxhY2UgZWxlbWVudC5pbm5lckhUTUwgPSBodG1sU3RyaW5nIHdpdGggJCgpLmh0bWwoaHRtbFN0cmluZylcbi8vIFJlcGxhY2UgYW55IGNvZGUgeW91IGhhdmUgdG8gb2J0YWluIHRoZSB2YWx1ZSBwcm9wZXJ0eSBvZiBhbiBpbnB1dCBmaWVsZCB3aXRoIHRoZSBqUXVlcnkgLnZhbCgpIG1ldGhvZC5cblxuXG4vLyBub24ganF1ZXJ5LXJlZmFjdG9yZWQgY29kZTpcblxuLy8gLy8gTWFrZSBhIHZhcmlhYmxlIGZvciBET00gcGxhY2VtZW50IGZyb20gdGhlIGVtcHR5IGFydGljbGUgdGFnIGluIGluZGV4Lmh0bWxcbi8vIC8vIFE6IHdoeSBkb2Vzbid0IHRoaXMgd29yayB3aXRoIGdldEVsZW1lbnRzQnlDbGFzc05hbWU/XG4vLyBjb25zdCBlbnRyeUxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZW50cnlMb2dcIik7XG5cbi8vIC8vIEZvciBlYWNoIG9iamVjdCBpbiB0aGUgYXJyYXkgKGFrYSBlYWNoIGpvdXJuYWwgZW50cnkpLCB0cmFuc2Zvcm0gdGhlIGVudHJ5IGludG8gaHRtbCB3aXRoIHRoZSBjcmVhdGVKb3VybmFsRW50cnkgZnVuY3Rpb24gYWJvdmUgYW5kIGFkZCBpdCB0byB0aGUgRE9NJ3MgZW50cnlMb2cgYXJ0aWNsZVxuLy8gY29uc3QgcmVuZGVyRG9tID0ge1xuLy8gICBhZGRKb3VybmFsRW50cnkgKGVudHJpZXMpIHtcbi8vICAgICBlbnRyeUxvZy5pbm5lckhUTUwgPSBcIlwiXG4vLyAgICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbi8vICAgICAgIC8vIGNhbGxzIHRoZSBjcmVhdGUgZnVuY3Rpb24gaW5zaWRlIHRoZSBhZGQgZnVuY3Rpb25cbi8vICAgICAgIGVudHJ5TG9nLmlubmVySFRNTCArPSBkb21NYW5hZ2VyLmNyZWF0ZUpvdXJuYWxFbnRyeShlbnRyeSk7XG4vLyAgICAgfSk7XG4vLyAgIH1cbi8vIH0iLCJpbXBvcnQge0FQSX0gZnJvbSBcIi4vYXBpLWRhdGFcIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50cnkge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgdGhpcy5kYXRlID0gcHJvcHMuZGF0ZVxuICAgIHRoaXMuY29uY2VwdCA9IHByb3BzLmNvbmNlcHRcbiAgICB0aGlzLmVudHJ5ID0gcHJvcHMuZW50cnlcbiAgICB0aGlzLm1vb2QgPSBwcm9wcy5tb29kXG4gIH1cblxuICBnZXQgam91cm5hbEVudHJ5KCkge1xuICAgIHJldHVybiB7XG4gICAgICBkYXRlOiB0aGlzLmRhdGUsXG4gICAgICBjb25jZXB0OiB0aGlzLmNvbmNlcHQsXG4gICAgICBlbnRyeTogdGhpcy5lbnRyeSxcbiAgICAgIG1vb2Q6IHRoaXMubW9vZFxuICAgIH1cbiAgfVxuXG4gIHNhdmUgKCkge1xuICAgIHJldHVybiBBUEkuc2F2ZUpvdXJuYWxFbnRyaWVzKHRoaXMuam91cm5hbEVudHJ5KVxuICB9XG5cbn0iLCIvLyBUaGlzIGZ1bmN0aW9uIHJlZm9ybWF0cyB0aGUgYXJyYXkncyBvYmplY3RzIGludG8gdXNlci1mcmllbmRseSBodG1sIGZvciBkaXNwbGF5IGluIHRoZSBET01cbmNvbnN0IERvbU1hbmFnZXIgPSB7XG4gIGNyZWF0ZUpvdXJuYWxFbnRyeTogKGVudHJ5T2JqZWN0KSA9PiB7XG4gICAgbGV0IGh0bWxDb250ZW50ID0gYFxuICAgICAgPHNlY3Rpb24gY2xhc3M9XCJ1c2VyRW50cnlcIiBjbGFzcz1cInZpc2libGVXb3Jkc1wiPiBcbiAgICAgICAgPGgyPiR7ZW50cnlPYmplY3QuY29uY2VwdH08L2gyPlxuICAgICAgICA8cD4ke2VudHJ5T2JqZWN0LmVudHJ5fTwvcD5cbiAgICAgICAgPHA+PHN0cm9uZz5GZWVsaW5ncyBjaGVjazo8L3N0cm9uZz4gJHtlbnRyeU9iamVjdC5tb29kfTwvcD5cbiAgICAgICAgPHA+JHtlbnRyeU9iamVjdC5kYXRlfTwvcD4gXG4gICAgICA8L3NlY3Rpb24+XG4gICAgICA8aHI+YFxuICAgIHJldHVybiBodG1sQ29udGVudDtcbiAgfVxufVxuXG5leHBvcnQge0RvbU1hbmFnZXJ9XG5cbi8vIG9sZCBmdW5jdGlvbiBjb21wb3NpdGlvbjpcblxuLy8gbGV0IGNyZWF0ZUpvdXJuYWxFbnRyeSA9IChlbnRyeU9iamVjdCkgPT4ge1xuLy8gICBsZXQgaHRtbENvbnRlbnQgPSBgXG4vLyAgICAgPHNlY3Rpb24gY2xhc3M9XCJ1c2VyRW50cnlcIj4gXG4vLyAgICAgICA8aDI+JHtlbnRyeU9iamVjdC5jb25jZXB0fTwvaDI+XG4vLyAgICAgICA8cD4ke2VudHJ5T2JqZWN0LmVudHJ5fTwvcD5cbi8vICAgICAgIDxwPjxzdHJvbmc+RmVlbGluZ3MgY2hlY2s6PC9zdHJvbmc+ICR7ZW50cnlPYmplY3QubW9vZH08L3A+XG4vLyAgICAgICA8cD4ke2VudHJ5T2JqZWN0LmRhdGV9PC9wPiBcbi8vICAgICA8L3NlY3Rpb24+XG4vLyAgICAgPGhyPmBcbi8vICAgICByZXR1cm4gaHRtbENvbnRlbnQ7XG4vLyB9IiwiXG5pbXBvcnQge0FQSX0gZnJvbSBcIi4vYXBpLWRhdGFcIlxuaW1wb3J0IHtSZW5kZXJEb219IGZyb20gXCIuL2VudHJpZXNUb0RPTVwiXG5pbXBvcnQgRW50cnkgZnJvbSBcIi4vZW50cnktZm9ybVwiXG5pbXBvcnQgTW9vZCBmcm9tIFwiLi9tb29kLWZpbHRlclwiXG5cbi8vMS4gQ2FsbCB0aGUgQVBJIG9iamVjdCdzIGZ1bmN0aW9uICAyLiBSdW4gdGhlIGVudHJpZXMgdGhyb3VnaCB0aGUgZXhpc3RpbmcgY3JlYXRlIGFuZCBhZGQgZnVuY3Rpb25zICAzLiBDcmVhdGVzIGFuZCBhZGRzIGh0bWwgdG8gRE9NXG5cbkFQSS5nZXRKb3VybmFsRW50cmllcygpXG4udGhlbihlbnRyaWVzID0+IFJlbmRlckRvbS5hZGRKb3VybmFsRW50cnkoZW50cmllcykpXG5cbmxldCByZWNvcmRFbnRyeUJ1dHRvbiA9ICQoXCIjcmVjb3JkRW50cnlCdXR0b25cIilcbnJlY29yZEVudHJ5QnV0dG9uLmNsaWNrKGZ1bmN0aW9uKCkge1xuICBsZXQgamRhdGUgPSAkKFwiI2pvdXJuYWxEYXRlXCIpLnZhbCgpXG4gIGxldCBqY29uY2VwdCA9ICQoXCIjam91cm5hbENvbmNlcHRcIikudmFsKClcbiAgbGV0IGplbnRyeSA9ICQoXCIjam91cm5hbEVudHJ5XCIpLnZhbCgpXG4gIGxldCBqbW9vZCA9ICQoXCIjam91cm5hbE1vb2RcIikudmFsKClcblxuICBpZiAoamRhdGUgPT09IFwiXCIgfHwgamNvbmNlcHQgPT09IFwiXCIgfHwgamVudHJ5ID09PSBcIlwiIHx8IGptb29kID09PSBcIlwiKXtcbiAgICBhbGVydChcIlBsZWFzZSBmaWxsIG91dCB0aGUgZW50aXJlIGZvcm0hXCIpXG4gIH1cbiAgZWxzZSB7XG4gICAgbGV0IG5ld0VudHJ5ID0gbmV3IEVudHJ5KHtcbiAgICAgIGRhdGU6IGpkYXRlLFxuICAgICAgY29uY2VwdDogamNvbmNlcHQsXG4gICAgICBlbnRyeTogamVudHJ5LFxuICAgICAgbW9vZDogam1vb2QsXG4gICAgfSlcbiAgICBjb25zb2xlLmxvZyhuZXdFbnRyeSlcbiAgICBuZXdFbnRyeS5zYXZlKClcbiAgICAudGhlbiAoIChkYXRhKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIm5ldyBlbnRyeSBzYXZlZFwiLCBkYXRhKVxuICAgICAgcmV0dXJuIEFQSS5nZXRKb3VybmFsRW50cmllcygpXG4gICAgfSlcbiAgICAudGhlbihlbnRyaWVzID0+IFJlbmRlckRvbS5hZGRKb3VybmFsRW50cnkoZW50cmllcykpXG4gIH1cbn0pXG5cbi8vIGZpbHRlciBlbnRyaWVzIGJ5IG1vb2Qgc2VsZWN0aW9uXG5cbk1vb2QubW9vZEZpbHRlcigpXG5cbi8vIC8vIG5vbiBqcXVlcnkgcmVmYWN0b3JlZCBjb2RlOlxuXG4vLyAvLzEuIENhbGwgdGhlIEFQSSBvYmplY3QncyBmdW5jdGlvbiAgMi4gUnVuIHRoZSBlbnRyaWVzIHRocm91Z2ggdGhlIGV4aXN0aW5nIGNyZWF0ZSBhbmQgYWRkIGZ1bmN0aW9ucyAgMy4gQ3JlYXRlcyBhbmQgYWRkcyBodG1sIHRvIERPTVxuXG4vLyBBUEkuZ2V0Sm91cm5hbEVudHJpZXMoKVxuLy8gLnRoZW4oZW50cmllcyA9PiByZW5kZXJEb20uYWRkSm91cm5hbEVudHJ5KGVudHJpZXMpKVxuXG5cbi8vIGxldCByZWNvcmRFbnRyeUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVjb3JkRW50cnlCdXR0b25cIilcbi8vIHJlY29yZEVudHJ5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbi8vICAgbGV0IGpkYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqb3VybmFsRGF0ZVwiKS52YWx1ZVxuLy8gICBsZXQgamNvbmNlcHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpvdXJuYWxDb25jZXB0XCIpLnZhbHVlXG4vLyAgIGxldCBqZW50cnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpvdXJuYWxFbnRyeVwiKS52YWx1ZVxuLy8gICBsZXQgam1vb2QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpvdXJuYWxNb29kXCIpLnZhbHVlXG4vLyAgIGlmIChqZGF0ZSA9PT0gXCJcIiB8fCBqY29uY2VwdCA9PT0gXCJcIiB8fCBqZW50cnkgPT09IFwiXCIgfHwgam1vb2QgPT09IFwiXCIpe1xuLy8gICAgIGFsZXJ0KFwiUGxlYXNlIGZpbGwgb3V0IHRoZSBlbnRpcmUgZm9ybSFcIilcbi8vICAgfVxuLy8gICBlbHNlIHtcbi8vICAgICBsZXQgbmV3RW50cnkgPSBuZXcgRW50cnkoe1xuLy8gICAgICAgZGF0ZTogamRhdGUsXG4vLyAgICAgICBjb25jZXB0OiBqY29uY2VwdCxcbi8vICAgICAgIGVudHJ5OiBqZW50cnksXG4vLyAgICAgICBtb29kOiBqbW9vZCxcbi8vICAgICB9KVxuLy8gICAgIGNvbnNvbGUubG9nKG5ld0VudHJ5KVxuLy8gICAgIG5ld0VudHJ5LnNhdmUoKVxuLy8gICAgIC50aGVuICggKGRhdGEpID0+IHtcbi8vICAgICAgIGNvbnNvbGUubG9nKFwibmV3IGVudHJ5IHNhdmVkXCIsIGRhdGEpXG4vLyAgICAgICByZXR1cm4gQVBJLmdldEpvdXJuYWxFbnRyaWVzKClcbi8vICAgICB9KVxuLy8gICAgIC50aGVuKGVudHJpZXMgPT4gcmVuZGVyRG9tLmFkZEpvdXJuYWxFbnRyeShlbnRyaWVzKSlcbi8vICAgfVxuLy8gfSlcblxuLy8gLy8gZmlsdGVyIGVudHJpZXMgYnkgbW9vZCBzZWxlY3Rpb25cblxuLy8gbW9vZEZpbHRlcigpIiwiaW1wb3J0IHtBUEl9IGZyb20gXCIuL2FwaS1kYXRhXCJcbmltcG9ydCB7UmVuZGVyRG9tfSBmcm9tIFwiLi9lbnRyaWVzVG9ET01cIlxuXG4vLyBBZGQgZXZlbnQgbGlzdGVuZXJzIHRvIHJhZGlvIGJ1dHRvbnMgdG8gY2hvb3NlIGEgbW9vZFxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9vZCB7XG4gICAgc3RhdGljIG1vb2RGaWx0ZXIoKSB7XG4gICAgbGV0IG1vb2RCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShcIm1vb2RCdXR0b25cIilcbiAgICBtb29kQnV0dG9uLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudCA9PiB7XG4gICAgICAgIGxldCBtb29kVHlwZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgY29uc29sZS5sb2cobW9vZFR5cGUpXG4gIC8vIENhbGwgZmlsdGVyIGZ1bmN0aW9uIHRvIGRpc3BsYXkgb25seSBzZWxlY3RlZCBlbnRyaWVzIGFuZCByZW5kZXIgdG8gZG9tXG4gICAgICAgIEFQSS5nZXRKb3VybmFsRW50cmllcygpXG4gICAgICAgIC50aGVuKGVudHJpZXMgPT4gZW50cmllcy5maWx0ZXIoKGN1cnJlbnRFbnRyeSk9PiBjdXJyZW50RW50cnkubW9vZCA9PT0gbW9vZFR5cGUpKS50aGVuKGZpbHRlcmVkRW50cmllcyA9PiBSZW5kZXJEb20uYWRkSm91cm5hbEVudHJ5KGZpbHRlcmVkRW50cmllcykpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cblxuLy8gRElEIE5PVCBKUVVFUlkgVEhJUyBQQUdFIEJDIENPVUxETidUIE1BS0UgSVQgV09SS1xuXG4vLyBSZXBsYWNlIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIpIHdpdGggJChcInNlbGVjdG9yXCIpLmNsaWNrKClcbi8vIFJlcGxhY2UgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpZFwiKSB3aXRoICQoXCIjaWRcIilcbi8vIFJlcGxhY2UgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInNlbGVjdG9yXCIpIHdpdGggJChcInNlbGVjdG9yXCIpXG4vLyBSZXBsYWNlIGVsZW1lbnQuaW5uZXJIVE1MID0gaHRtbFN0cmluZyB3aXRoICQoKS5odG1sKGh0bWxTdHJpbmcpXG4vLyBSZXBsYWNlIGFueSBjb2RlIHlvdSBoYXZlIHRvIG9idGFpbiB0aGUgdmFsdWUgcHJvcGVydHkgb2YgYW4gaW5wdXQgZmllbGQgd2l0aCB0aGUgalF1ZXJ5IC52YWwoKSBtZXRob2QuXG5cblxuLy8gbm9uIGpxdWVyeS1yZWZhY3RvcmVkIGNvZGU6XG5cbi8vIEFkZCBldmVudCBsaXN0ZW5lcnMgdG8gcmFkaW8gYnV0dG9ucyB0byBjaG9vc2UgYSBtb29kXG4vLyBmdW5jdGlvbiBtb29kRmlsdGVyKCkge1xuLy8gICBsZXQgbW9vZEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKFwibW9vZEJ1dHRvblwiKVxuLy8gICBtb29kQnV0dG9uLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuLy8gICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXZlbnQgPT4ge1xuLy8gICAgICAgbGV0IG1vb2RUeXBlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuLy8gICAgICAgY29uc29sZS5sb2cobW9vZFR5cGUpXG4vLyAvLyBDYWxsIGZpbHRlciBmdW5jdGlvbiB0byBkaXNwbGF5IG9ubHkgc2VsZWN0ZWQgZW50cmllcyBhbmQgcmVuZGVyIHRvIGRvbVxuLy8gICAgICAgQVBJLmdldEpvdXJuYWxFbnRyaWVzKClcbi8vICAgICAgIC50aGVuKGVudHJpZXMgPT4gZW50cmllcy5maWx0ZXIoKGN1cnJlbnRFbnRyeSk9PiBjdXJyZW50RW50cnkubW9vZCA9PT0gbW9vZFR5cGUpKS50aGVuKGZpbHRlcmVkRW50cmllcyA9PiByZW5kZXJEb20uYWRkSm91cm5hbEVudHJ5KGZpbHRlcmVkRW50cmllcykpXG4vLyAgICAgfSlcbi8vICAgfSlcbi8vIH0iXX0=
