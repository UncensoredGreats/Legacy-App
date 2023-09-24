import React, { useState, useEffect } from 'react';
import AuthorCard from './AuthorCard';
import styles from '../../styles/Home.module.css';
import { useResetCards } from '../../contexts/CardStateContext';

function HomePage({ authors }) {
  const [activeAuthor, setActiveAuthor] = useState(null);
  const resetCards = useResetCards();

  useEffect(() => {
    setActiveAuthor(null);
    resetCards();
  }, []);

  const handleCardClick = (authorId) => {
    setActiveAuthor(authorId === activeAuthor ? null : authorId);
  };

  return (
    <div className={styles.grid}>
      {authors.map((author) => (
        <div key={author.id} onClick={() => handleCardClick(author.id)}>
          <AuthorCard 
            author={author} 
            expanded={activeAuthor === author.id} 
          />
        </div>
      ))}
    </div>
  );
}

export default HomePage;




// // HomePage.tsx
// import React, { useEffect } from 'react';
// import AuthorList from './AuthorList';
// import AuthorCard from './AuthorCard';
// import styles from '../../styles/Home.module.css';
// import { useActiveChat } from '../../contexts/ActiveChatContext';
// import { useResetCards } from '../../contexts/CardStateContext';

// function HomePage({ authors }) {
//   const { activeChat, setActiveChat } = useActiveChat();
//   const resetCards = useResetCards();

//   useEffect(() => {
//     setActiveChat(null);
//     resetCards();
//   }, []);

//   return (
//     <div>
//       <div className={styles.grid}>
//         {/* This add the OG Page at the bottom. I want to merge them. */}
//         {authors.map((author) => (
//           activeChat === null || activeChat === author.id ?
//             <AuthorCard key={author.id} author={author} />
//             : null
//         ))}

        // <div className={styles.virtualBookshelfRow}>
        //   <AuthorList authors={authors} />
        // </div>

//       </div>
//     </div>
//   );
// }

// export default HomePage;



// // OG

// import React, { useEffect } from 'react';
// import AuthorCard from './AuthorCard';
// import styles from '../../styles/Home.module.css';
// import { useActiveChat } from '../../contexts/ActiveChatContext';
// import { useCardState, useResetCards } from '../../contexts/CardStateContext';

// function HomePage({ authors }) {
//   const { activeChat, setActiveChat } = useActiveChat();
//   const resetCards = useResetCards();

//   useEffect(() => {
//     // Reset active chat when HomePage mounts
//     setActiveChat(null);
//     resetCards();
//   }, []);

//   return (
//     <div>
//       <div className={styles.grid}>
//         {authors.map((author) => (
//           activeChat === null || activeChat === author.id ?
//             <AuthorCard key={author.id} author={author} />
//             : null
//         ))}
//       </div>
//     </div>
//   );
// }

// export default HomePage;