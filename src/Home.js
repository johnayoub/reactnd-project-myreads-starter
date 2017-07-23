import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Bookshelf from "./Bookshelf";
import Bookshelves from "./Bookshelves";
import Sortby from "sort-by";

class Home extends React.Component {
  createBookshelves() {
    var booksByShelf = this.props.books.reduce((map, book) => {
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
        books: (booksByShelf[shelf.key] || []).sort(Sortby("title"))
      };
    });

    return bookshelvesToDisplay;
  }

  render() {
    const bookshelves = this.createBookshelves();

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div>
            <div className="list-books-content">
              <div>
                {bookshelves.map(shelf =>
                  <Bookshelf
                    key={shelf.key}
                    bookshelfTitle={shelf.name}
                    books={shelf.books}
                    onBookshelfChange={this.props.onBookshelfChange}
                  />
                )}
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
      </div>
    );
  }
}

Home.PropTypes = {
  books: PropTypes.array.isRequired,
  onBookshelfChange: PropTypes.func.isRequired
}

export default Home;
