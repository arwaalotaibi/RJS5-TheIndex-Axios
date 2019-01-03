import React, { Component } from "react";

class BookRow extends Component {
  render() {
    let book = this.props.book;
    console.log(book)
    let authors = book.authors.map(author => (
      <div className="row">{author.name}</div>
    )) 

    return (
      <tr>
        <td>{book.title}</td>
        <td>
          <div className="col">{authors}</div>
        </td>
        <td>
          <button className="btn" style={{ backgroundColor: book.color }} />
        </td>
      </tr>
    );
  }
}

export default BookRow;
