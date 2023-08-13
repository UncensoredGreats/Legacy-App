// components/VirtualBookShelfComponent.tsx
import { useState, useEffect } from 'react';
import { handleReadBookClick } from '../../utils/handleReadBookClick';

const VirtualBookShelfComponent = () => {
  const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('/books.json')
        .then((response) => response.json())
        .then((data) => {
            const shuffledBooks = shuffleArray(data);
            setBooks(shuffledBooks);
        });
    }, []);

//   useEffect(() => {
//     fetch('/api/books/getBooks')
//       .then((response) => response.json())
//       .then((data) => {
//         const shuffledBooks = shuffleArray(data);
//         setBooks(shuffledBooks);
//       });
//   }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '300px', margin: '0 auto' }}>
      {books.slice(0, 5).map((book, index) => {
        // Splitting the path to extract author and title
        const pathParts = book.imagePath.split('/');
        const authorId = pathParts[pathParts.length - 2].split(' ').join('_');
        const title = pathParts[pathParts.length - 1].replace('.png', '').split(' ').join('_');

        return (
          <div key={index} style={{ width: '50px', padding: '5px', display: 'inline-block' }}>
            <a href="#" onClick={() => handleReadBookClick(authorId, title)}>
              <img src={book.imagePath} alt={title} style={{ width: '100%', height: 'auto' }} />
            </a>
          </div>
        );
      })}
    </div>
  );
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap the elements
  }
  return array;
}

export default VirtualBookShelfComponent;
