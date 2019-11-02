import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import * as Helpers from '../Helpers';
import Book from './Book';

class Search extends Component {

    state = {
        query: '',
        books: []
    }

    queryTimer = null;

    getQuery = (value) => {
        clearTimeout(this.queryTimer);
        this.setState({query: value});
        this.queryTimer = setTimeout(this.getSearch, 180);
    }

    getSearch = () => {
        if (this.state.query === '') {
            this.setState({error: false, books: []});
            return;
        }


        BooksAPI.search(this.state.query).then(response => {

            let newList = [];
            let newError = false;

            if (response === undefined || (response.error && response.error !== "empty query")) {
                    newError = true;
            } else if (response.length) {
                    newList = Helpers.mergeResult(this.props.selectedBooks, response);
                    newList = Helpers.sortAll(newList);
            }

            this.setState({error: newError, books: newList});
        })
    }

    getProps = (props) => {
        this.props = props;
        let newList = Helpers.mergeResult(this.props.selectedBooks, this.state.books);
        newList = Helpers.sortAll(newList);
        this.setState({books: newList});
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            ref={input => input && input.focus()}
                            type="text"
                            placeholder="Search by title or author"
                            onChange={(e) => this.getQuery(e.target.value)}
                            value={this.state.query.value}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    {this.state.error && (
                        <span>There was a problem with your search.</span>
                    )}
                    {!this.state.error && (
                        <span>N. {this.state.books.length} - books match your search.</span>
                    )}
                    <ol className="books-grid">
                        {this.state.books && this.state.books.map(book =>
                        (
                            <li key={book.id}>
                                <Book book={book} updateCategory={this.props.updateCategory}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div >
        )
    }
}

export default Search;