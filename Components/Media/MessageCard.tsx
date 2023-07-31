import React from 'react';
import { Card, Grid } from 'semantic-ui-react';
import styles from '../../styles/MessageCard.module.css';
import { useMessageCardState } from '../../contexts/MessageCardContext';
import PublicAuthorMessage from "./PublicAuthorMessage";

const MessageCard = ({ post, id }) => {
  const { messageCardState: { isFlipped, animationPlayed }, flipCard, setAnimationPlayed } = useMessageCardState(post.id);

  const cardClass = `${styles.authorCard}`;

  const { cardColor, jsx: PublicAuthorMessageJSX } = PublicAuthorMessage({ post, authorId: post.author_id, isFlipped, animationPlayed, setAnimationPlayed, flipCard });

  return (
    <Card
      className={`${styles.cardContainer} ${cardClass}`}
      key={post.id}
      fluid
      id={id}
      color={cardColor}
      style={{
        maxWidth: '100%',
        margin: '0 0% 2.5em 0',
        backgroundColor: '#fbfbf5',
     }}
    >
      <Card.Content style={{ padding: '1em', position: 'relative' }}>
        <Grid>
          {PublicAuthorMessageJSX}
        </Grid>
      </Card.Content>
    </Card>
  );
};

export default MessageCard;








