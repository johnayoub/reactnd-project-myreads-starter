import React from "react";
import PropTypes from "prop-types";
import Book from "./Book";

class Bookshelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          {this.props.bookshelfTitle}
        </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map(book =>
              <li key={book.id}>
                <Book
                  book={book}
                  onBookshelfChange={this.props.onBookshelfChange}
                />
              </li>
            )}
          </ol>
          {
            this.props.books.length === 0 && (
              <div style={{"text-align": "center"}}>
                <i>You currently don't have any books in this shelf.</i>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

Bookshelf.PropTypes = {
  bookshelfTitle: PropTypes.string.isRequired,
  onBookshelfChange: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired
};

export default Bookshelf;
