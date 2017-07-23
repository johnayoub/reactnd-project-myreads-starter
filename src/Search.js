import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";
import BookUpdate from "./BooksAPIUpdateWrapper";

class Search extends React.Component {
  state = {
    books: [],
    query: ""
  };

  handleSearch = e => {
    const query = e.target.value,
          trimmedQuery = query.slice(0).trim();

    if (trimmedQuery.length > 0) {
      BooksAPI.search(trimmedQuery, 50)
        .then(books => {
          this.setState({ books });
        })
        .catch(e => {

        });
    }
    else {
      this.setState({ books: [] });
    }

    this.setState({ query });
  };

  handleBookshelfChange = (book, newBookshelf) => {
    BookUpdate(book, newBookshelf, this.state.books)
      .then(books => {
        this.setState({ books });
      })
      .catch(e => {});
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.handleSearch}
              value={this.state.query}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map(book =>
              <li key={book.id}>
                <Book
                  book={book}
                  onBookshelfChange={this.handleBookshelfChange}
                />
              </li>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
