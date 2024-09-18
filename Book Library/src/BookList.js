import React from "react";

const BookList = ({ books }) => {
  if (books.length === 0) {
    return <p>No books available</p>;
  }

  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>
          <h3>{book.title}</h3>
          <p>by {book.author}</p>
        </li>
      ))}
    </ul>
  );
};

export default BookList;
