import React from "react";
import * as BooksAPI from "./BooksAPI";
import Spinner from "./Spinner";
import Home from "./Home";
import Search from "./Search";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import "../node_modules/font-awesome/css/font-awesome.css";

class BooksApp extends React.Component {
  state = {
    books: [],
    isLoadingBooks: true
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState({ books, isLoadingBooks: false });
      })
      .catch(e => {});
  }

  handleBookshelfChange = (book, newBookshelf) => {
    BooksAPI.update(book, newBookshelf)
      .then(() => {
        const updatedBook = JSON.parse(JSON.stringify(book));

        updatedBook.shelf = newBookshelf;

        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([updatedBook])
        }));
      })
      .catch(e => {});
  };

  render() {
    return (
      <div className="app">
        {this.state.isLoadingBooks
          ? <Spinner message={"Loading App..."} />
          : <Switch>
              <Route
                exact
                path="/"
                render={() =>
                  <Home
                    books={this.state.books}
                    onBookshelfChange={this.handleBookshelfChange}
                  />}
              />
              <Route
                exact
                path="/search"
                render={() =>
                  <Search
                    books={this.state.books}
                    onBookshelfChange={this.handleBookshelfChange}
                  />}
              />
            </Switch>}
      </div>
    );
  }
}

export default BooksApp;
