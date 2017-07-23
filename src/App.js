import React from 'react'
import Home from './Home';
import Search from './Search';
import { Switch, Route } from 'react-router-dom'
import './App.css'
import '../node_modules/font-awesome/css/font-awesome.css';

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={Search} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
