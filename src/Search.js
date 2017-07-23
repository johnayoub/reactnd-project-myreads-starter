import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";

class Search extends React.Component {
  state = {
    searchResults: [],
    query: ""
  };

  handleSearch = e => {
    const query = e.target.value,
      trimmedQuery = query.slice(0).trim();

    if (trimmedQuery.length > 0) {
      BooksAPI.search(trimmedQuery, 50)
        .then(response => {
          // set the searchResults to [] if the query value is ''
          // this could happen if the user typed too quickly to set off
          // a search followed below else statement
          if (response.error) {
            this.setState(state => ({ searchResults: [] }));

            return;
          }

          // if the search results matches one my books then updated the shelf
          // to match.
          response.forEach(book => {
            const myBook = this.props.books.filter(b => b.id === book.id)[0];

            if (myBook) {
              book.shelf = myBook.shelf;
            }
          });

          this.setState(state => ({
            searchResults: state.query.length === 0 ? [] : response
          }));
        })
        .catch(e => {});
    } else {
      this.setState(state => ({ searchResults: [] }));
    }
    this.setState({ query });
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
            {this.state.searchResults.map(book =>
              <li key={book.id}>
                <Book
                  book={book}
                  onBookshelfChange={this.props.onBookshelfChange}
                />
              </li>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

Search.PropTypes = {
  books: PropTypes.array.isRequired,
  onBookshelfChange: PropTypes.func.isRequired
};

export default Search;
