class Bookshelf {
  constructor(key, name, displayInShelves = true, displayInOptions = true) {
    this.key = key;
    this.name = name;
    this.displayInShelves = displayInShelves;
    this.displayInOptions = displayInOptions;
  }
}

const Bookshelves = [
  new Bookshelf("currentlyReading","Currently Reading"),
  new Bookshelf("wantToRead", "Want to Read"),
  new Bookshelf("read", "Read"),
  new Bookshelf("none", "None", false)
];

export default Bookshelves;
