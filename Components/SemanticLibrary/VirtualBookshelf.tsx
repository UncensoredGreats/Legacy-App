import { useState, useEffect, useRef, useCallback } from 'react';
import { handleReadBookClick } from '../../utils/handleReadBookClick';
import styles from '../../styles/VirtualBookshelf.module.css';
import Image from 'next/image';

const VirtualBookShelfComponent = () => {
  const [books, setBooks] = useState([]);
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const booksRef = useRef(null);

  const loadMoreBooks = useCallback(() => {
    if (loadingMore) return;
    setLoadingMore(true);
    setDisplayedBooks(books.slice(0, displayedBooks.length + 20));
    setLoadingMore(false);
  }, [displayedBooks, loadingMore, books]);

  useEffect(() => {
    fetch('/books.json')
      .then((response) => response.json())
      .then((data) => {
        const shuffledBooks = shuffleArray(data);
        setBooks(shuffledBooks);
        setDisplayedBooks(shuffledBooks.slice(0, 20));
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const bookShelf = booksRef.current;
      if (bookShelf && bookShelf.getBoundingClientRect().bottom <= window.innerHeight) {
        loadMoreBooks();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreBooks]);

  return (
    <div ref={booksRef} className={styles.bookshelf}>
      {displayedBooks.map((book, index) => {
        const pathParts = book.imagePath.split('/');
        const authorId = pathParts[pathParts.length - 2].split(' ').join('_');
        const title = pathParts[pathParts.length - 1].replace('.png', '').split(' ').join('_');
        return (
          <div key={index} className={styles.book}>
            <a href="#" onClick={() => handleReadBookClick(authorId, title)} className={styles.bookImage}>
              {/* Next.js Migration Version */}
              {/* <img src={book.imagePath} alt={title} className={styles.image} /> */} 
              <Image
                src={book.imagePath}
                alt={title}
                width={150}
                height={150}
                className={styles.image}
              />
            </a>
            <div className={styles.bookInfo}>
              <p className={styles.title}>{title.replace(/_/g, ' ')}</p>
              <p className={styles.author}>{authorId.replace(/_/g, ' ')}</p>
            </div>
          </div>
        );
      })}
      {loadingMore && <div className={styles.loadingMore}>Loading more books...</div>}
    </div>
  );
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default VirtualBookShelfComponent;
