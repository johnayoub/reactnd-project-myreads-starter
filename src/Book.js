import React from "react";
import PropTypes from "prop-types";
import Bookshelves from "./Bookshelves";

class Book extends React.Component {
  handleBookshelfChange = e => {
    this.props.onBookshelfChange(this.props.book, e.target.value);
  };

  render() {
    // authors could be null/undefined
    const book = this.props.book,
      options = Bookshelves.filter(shelf => shelf.displayInOptions),
      authors = book.authors || [''],
      thumbnail =
        (book.imageLinks && book.imageLinks.thumbnail) ||
        "/book-default.jpg";

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${thumbnail})`
            }}
          />
          <div className="book-shelf-changer">
            <select
              value={this.props.book.shelf}
              onChange={this.handleBookshelfChange}
            >
              <option value="moveTo" disabled>
                Move to...
              </option>
              {options.map(option =>
                <option key={option.key} value={option.key}>
                  {option.name}
                </option>
              )}
            </select>
          </div>
        </div>
        <div className="book-title">
          {book.title}
        </div>
        <div className="book-authors">
          {authors.join(", ")}
        </div>
      </div>
    );
  }
}

Book.PropTypes = {
  book: PropTypes.object.isRequired,
  onBookshelfChange: PropTypes.func.isRequired
};

export default Book;
