import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupForm from "./PopupForm";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [bookToUpdate, setBookToUpdate] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios
      .get("https://node56763-teeradolnoderest.proen.app.ruk-com.cloud/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  };

  const viewBook = (id) => {
    const selectedBook = books.find((book) => book.id === id);
    if (selectedBook) {
      alert(
        "Book Title: " + selectedBook.title + "\n" + "Book Author: " + selectedBook.author
      );
    }
  };

  const deleteBook = (id) => {
    axios
      .delete(`https://node56763-teeradolnoderest.proen.app.ruk-com.cloud/books/${id}`)
      .then(() => {
        setBooks(books.filter((book) => book.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
      });
  };

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setBookToUpdate(null);
  };

  const handleUpdateBook = (book) => {
    setBookToUpdate(book);
    handleOpenPopup();
  };

  const handleFormSubmit = (data) => {
    if (bookToUpdate) {
      // Update existing data
      axios
        .put(
          `https://node56763-teeradolnoderest.proen.app.ruk-com.cloud/books/${bookToUpdate.id}`,
          data
        )
        .then(() => {
          fetchBooks();
        })
        .catch((error) => {
          console.error("Error updating book:", error);
        });
    } else {
      // Add new data with a unique id
      axios
        .post("https://node56763-teeradolnoderest.proen.app.ruk-com.cloud/books", data)
        .then(() => {
          fetchBooks();
        })
        .catch((error) => {
          console.error("Error adding book:", error);
        });
    }
    handleClosePopup();
  };

  return (
    <div>
      <h2>Books</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <button onClick={() => viewBook(book.id)}>View</button>
                <button onClick={() => handleUpdateBook(book)}>Update</button>
                <button onClick={() => deleteBook(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handleOpenPopup}>Add Author and Title</button>
        <PopupForm
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          onSubmit={handleFormSubmit}
          initialData={bookToUpdate}
        />
      </div>
    </div>
  );
}
