import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Bookshelf from "./Bookshelf";
import Bookshelves from "./Bookshelves";
import Spinner from './Spinner';
import Sortby  from 'sort-by';

class Home extends React.Component {
  state = {
    books: [],
    isLoadingBooks: true
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState({ books, isLoadingBooks: false });
      })
      .catch(e => {
        
      });
  }

  createBookshelves() {
    var booksByShelf = this.state.books.reduce((map, book) => {
      const key = book.shelf;

      map[key] = map[key] || [];
      map[key].push(book);

      return map;
    }, {});

    const bookshelvesToDisplay = Bookshelves.filter(
      shelf => shelf.displayInShelves
    ).map(shelf => {
      return {
        key: shelf.key,
        name: shelf.name,
        books: (booksByShelf[shelf.key] || []).sort(Sortby('title'))
      };
    });

    return bookshelvesToDisplay;
  }

 handleBookshelfChange = (book, newBookshelf) => {
   BooksAPI.update(book, newBookshelf)
    .then(response => {
      const books = JSON.parse(JSON.stringify(this.state.books)),
            bookToUpdate = books.filter(b => b.id === book.id)[0];

      bookToUpdate.shelf = newBookshelf;

      this.setState({ books });
    })
    .catch(e => {

    });
 }

  render() {
    const bookshelves = this.createBookshelves();

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        {
          this.state.isLoadingBooks ?
          <Spinner message={"Loading books..."} />
          :
          <div>
            <div className="list-books-content">
              <div>
                {bookshelves.map(shelf =>
                  <Bookshelf
                    key={shelf.key}
                    bookshelfTitle={shelf.name}
                    books={shelf.books}
                    onBookshelfChange={this.handleBookshelfChange}
                  />
                )}
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Home;
