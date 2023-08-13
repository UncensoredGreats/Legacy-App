// pages/virtualBookshelf.tsx
import { useState, useEffect } from 'react';

const VirtualBookShelf = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('/books.json')
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

//   useEffect(() => {
//     fetch('/api/books/getBooks')
//       .then((response) => response.json())
//       .then((data) => setBooks(data));
//   }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {books.map((book, index) => (
        <div key={index} style={{ width: '15%', padding: '10px', display: 'inline-block' }}>
          <div>
            <img src={book.imagePath} alt={book.title} style={{ width: '100%', height: 'auto' }} />
            <div style={{ textAlign: 'center', marginTop: '5px' }}>
              <p>{book.title}</p>
              <p>{book.author}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VirtualBookShelf;
