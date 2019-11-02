import React from 'react'
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import * as Helpers from './Helpers';
import BookCase from './components/BookCase';
import Search from './components/Search';
import './App.css'

class BooksApp extends React.Component {

  state = {
    showSearchPage: false
  }

  componentDidMount = () => {
    if (this.state.newBook) {
      this.Refresh();
    }
  }

  Refresh = () => {
    BooksAPI.getAll()
      .then((list) => {
        this.setState({
          books: Helpers.sortAll(list),
          newBook: false
        });
      });
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(response => {
        let newList = this.state.books.slice(0);
        const books = newList.filter(listBook => listBook.id === book.id);
        if (books.length) {
          books[0].shelf = shelf;
        } else {
          newList.push(book);
          newList = Helpers.sortAll(newList);
        }
        this.setState({books: newList});
      })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={(() => (
          <BookCase books={this.state.books} updateCategory={this.updateShelf} onRefresh={this.Refresh}/>
        ))}/>
        <Route exact path='/search' render={(() => (<Search selectedBooks={this.state.books} updateCategory={this.updateShelf}/>))}/>
      </div>
    )
  }
}

export default BooksApp