import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import styles from '../../styles/Home.module.css';
import useStreamingText from './Stream';
import { useCardState } from '../../contexts/CardStateContext';
import { useActiveChat } from '../../contexts/ActiveChatContext';

const AuthorCard = ({ author }) => {
  const { cardState, flipCard, startChat, stopChat } = useCardState(author.id);
  const { activeChat, setActiveChat } = useActiveChat();
  const streamedDescription = useStreamingText(author.description, 15, cardState.startStreaming || false);
  const router = useRouter();

  useEffect(() => {
    console.log('chatMode: ', cardState.chatMode);
  }, [cardState.chatMode]);

  // Added to reset activechat to null when the user navigates home: 
  useEffect(() => {
    if (router.pathname === '/' || router.pathname === '/the-greats') {
        setActiveChat(null);
    }
  }, [router.pathname]);

  const handleClick = () => {
    flipCard();
  };

  const handleChatClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Chat Clicked');
    if (!cardState.chatMode) {
      startChat();
      setActiveChat(author.id);
      router.push(`/chat/${author.id}`);
    } else {
      stopChat();
      setActiveChat(null);
      router.push('/');
    }
  };

  const handleReadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };


    return (
      <div onClick={handleClick} className={`${styles.cardContainer} ${cardState.isFlipped ? styles.cardFlipped : ''}`}>
        {cardState.isFlipped ? (
          <Card className={styles.cardBack} raised>
            <Card.Content textAlign='center' style={{ minHeight: "210px", maxHeight: "210px", overflowY: "auto" }}>
              <Card.Description>{streamedDescription}</Card.Description>
            </Card.Content>
            <Card.Content textAlign='center'style={{ maxHeight: "50px", minHeight: "50px" }}> 
              <div className='tiny ui two buttons' onClick={(e) => e.stopPropagation()}>
                <Button color='blue' onClick={handleChatClick}>Chat</Button>
                {/* <Button color='olive'>Read</Button> */}
              </div>
            </Card.Content>
          </Card>
        ) : (
          <Card className={styles.cardFront} raised>
            <div>
              <Image src={`/images/${author.id}.png`} className={styles.cardImage} />
            </div>
            <Card.Content textAlign='center'>
              <Card.Content style={{ fontSize: '16px', fontWeight: 'bold'}}>{`${author.id}`}</Card.Content>
            </Card.Content>
          </Card>
        )}
      </div>
    );
  };


export default AuthorCard;
