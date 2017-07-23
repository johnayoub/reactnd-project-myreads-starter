import * as BooksAPI from "./BooksAPI";

function updateBook(book, newBookshelf, books) {
  return BooksAPI.update(book, newBookshelf).then(response => {
    const booksCopy = JSON.parse(JSON.stringify(books)),
      bookToUpdate = booksCopy.filter(b => b.id === book.id)[0];

    bookToUpdate.shelf = newBookshelf;

    return booksCopy;
  });
}

export default updateBook;
