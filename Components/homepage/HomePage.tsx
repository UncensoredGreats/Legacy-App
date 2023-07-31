import React, { useEffect } from 'react';
import AuthorCard from './AuthorCard';
import styles from '../../styles/Home.module.css';
import { useActiveChat } from '../../contexts/ActiveChatContext';
import { useCardState, useResetCards } from '../../contexts/CardStateContext';

function HomePage({ authors }) {
  const { activeChat, setActiveChat } = useActiveChat();
  const resetCards = useResetCards();

  useEffect(() => {
    // Reset active chat when HomePage mounts
    setActiveChat(null);
    resetCards();
  }, []);

  return (
    <div>
      <div className={styles.grid}>
        {authors.map((author) => (
          activeChat === null || activeChat === author.id ?
            <AuthorCard key={author.id} author={author} />
            : null
        ))}
      </div>
    </div>
  );
}

export default HomePage;