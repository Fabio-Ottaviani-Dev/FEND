import React, {Component} from 'react'
import Category from "./Category";

class Book extends Component {

    state = {
        shelfSelection: this.props.book.shelf || "none"
    }

    render() {
        const authors = this.props.book.authors && this.props.book.authors.join(' | ');
        let url = (this.props.book.imageLinks && `url(${this.props.book.imageLinks.thumbnail})`);

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{width: 128, height: 193, backgroundImage: url}}></div>
                    <Category book={this.props.book} updateCategory={this.props.updateCategory} />
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">{authors}</div>
            </div>
        )
    }
}

export default Book;