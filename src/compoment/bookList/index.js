import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../../graphql/queries'




class BookList extends Component {
  constructor() {
    super()

  }

  showBookList = () => {
    const { data: { books, loading } } = this.props;
    if (loading) {
      return <div>Loading...</div>
    }
    else {
      return books && books.length && books.map(book => {
        return <li key={book.id}>{book.name}</li>
      })
    }
  }

  render() {
    return (
      <div>
        <ul>
        {this.showBookList()}
        </ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);