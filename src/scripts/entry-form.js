import API from "./api-data"
export default class Entry {

  constructor(props) {
    this.date = props.date
    this.concept = props.concept
    this.entry = props.entry
    this.mood = props.mood
  }

  get journalEntry() {
    return {
      date: this.date,
      concept: this.concept,
      entry: this.entry,
      mood: this.mood
    }
  }

  save () {
    return API.saveJournalEntries(this.journalEntry)
  }

}