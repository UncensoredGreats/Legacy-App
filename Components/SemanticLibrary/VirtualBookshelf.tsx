// // Semantic UI version w/o shuffled books.

// import { useState, useEffect } from 'react';
// import { handleReadBookClick } from '../../utils/handleReadBookClick';
// import { Card, Image, Segment } from 'semantic-ui-react';
// import styles from '../../styles/VirtualBookshelf.module.css';

// interface Book {
//   author: string;
//   title: string;
//   imagePath: string;
// }

// const VirtualBookShelfComponent = ({ author }) => {
//   const [groupedBooks, setGroupedBooks] = useState<{ [author: string]: Book[] }>({});
//   const booksByThisAuthor = groupedBooks[author] || [];

//   useEffect(() => {
//     fetch('/books.json')
//       .then((response) => response.json())
//       .then((data: Book[]) => {
      
//         const authorGroups: { [author: string]: Book[] } = {};
//         data.forEach((book) => {
//           if (!authorGroups[book.author]) {
//             authorGroups[book.author] = [];
//           }
//           authorGroups[book.author].push(book);
//         });
//         setGroupedBooks(authorGroups);
//       });
//   }, []);

//   return (
//     <div className={styles["✍️"]}>
//       <div className={styles["🌐🌈"]}>
//         <Segment
//           className={`${styles["🌟"]} ${styles["📜"]} ${styles["🕵️‍♀️📜"]}`}
//           style={{ display: 'flex', overflowX: 'auto' }}
//         >
//           {booksByThisAuthor.map((book, bookIndex) => (
//             <div className={styles["👤🎴-container"]} key={bookIndex}>
//               <Card 
//                 className={`${styles["👤🎴"]} ${styles["👤🎴-custom"]}`} 
//                 onClick={() => handleReadBookClick(book.author, book.title)}
//               >
//                 <div className={styles["🖼️🌌"]}>
//                   <Image
//                     src={book.imagePath}
//                     alt={book.title}
//                     className={styles["👩‍🎨📷"]}
//                   />
//                 </div>
//                 <Card.Content className={styles["👤🎴-header"]}>
//                     {book.title}
//                 </Card.Content>
//               </Card>
//             </div>
//           ))}
//         </Segment>
//       </div>
//     </div>
//   );
// };

// export default VirtualBookShelfComponent;










// // Semantic UI finished version with shuffled books.
// import { useState, useEffect, useRef, useCallback } from 'react';
// import { handleReadBookClick } from '../../utils/handleReadBookClick';
// import { Card, Image, Segment } from 'semantic-ui-react';

// interface Book {
//   author: string;
//   title: string;
//   imagePath: string;
// }

// const VirtualBookShelfComponent = () => {
//   const [books, setBooks] = useState<Book[]>([]);
//   const [groupedBooks, setGroupedBooks] = useState<{ [author: string]: Book[] }>({});
//   const [displayedBooks, setDisplayedBooks] = useState([]);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const booksRef = useRef(null);

//   const loadMoreBooks = useCallback(() => {
//     if (loadingMore) return;
//     setLoadingMore(true);
//     setDisplayedBooks(books.slice(0, displayedBooks.length + 20));
//     setLoadingMore(false);
//   }, [displayedBooks, loadingMore, books]);

//   useEffect(() => {
//     fetch('/books.json')
//       .then((response) => response.json())
//       .then((data) => {
//         const shuffledBooks = shuffleArray(data);
//         setBooks(shuffledBooks);
//         setDisplayedBooks(shuffledBooks.slice(0, 20));
//       });
//   }, []);

//   useEffect(() => {
//     fetch('/books.json')
//       .then((response) => response.json())
//       .then((data: Book[]) => {
//         const shuffledBooks = shuffleArray(data);
//         setBooks(shuffledBooks);

//         const authorGroups: { [author: string]: Book[] } = {};
//         shuffledBooks.forEach((book) => {
//           if (!authorGroups[book.author]) {
//             authorGroups[book.author] = [];
//           }
//           authorGroups[book.author].push(book);
//         });
//         setGroupedBooks(authorGroups);
//       });
//   }, []);

//   return (
//     <div className="✍️">
//       <div className="🌐🌈">
//         {Object.keys(groupedBooks).map((author, index) => (
//           <Segment
//             className="🌟 📜 🕵️‍♀️📜"
//             style={{ display: 'flex', overflowX: 'auto' }}
//             key={index}
//           >
//             {groupedBooks[author].map((book, bookIndex) => (
//               <div className="👤🎴-container" key={bookIndex}>
//                 <Card className={`👤🎴 👤🎴-custom`} onClick={() => handleReadBookClick(book.author, book.title)}>
//                   <div className="🖼️🌌">
//                     <Image
//                       src={book.imagePath}
//                       alt={book.title}
//                       className="👩‍🎨📷"
//                     />
//                   </div>
//                   <Card.Content className="👤🎴-header">
//                     {/* <Card.Header className="👤🎴-header"> */}
//                       {book.title}
//                     {/* </Card.Header> */}
//                   </Card.Content>
//                 </Card>
//               </div>
//             ))}
//           </Segment>
//         ))}
//       </div>
//     </div>
//   );
// };

// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// }

// export default VirtualBookShelfComponent;


















// OG

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

