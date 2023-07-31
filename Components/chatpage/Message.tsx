// uses AuthorMessage Component.
import AuthorMessage from "./AuthorMessage"
import React, { useEffect } from 'react';
import { Card, Image, Grid, Label, Transition, Loader } from 'semantic-ui-react';
import styles from '../../styles/Messages.module.css';
import SourceCards from '../Cards/SourceCards';
import { useMessageCardState } from '../../contexts/MessageCardContext';
import FavoriteStar from '../supadb/FavoriteStar';

type MessageProps = {
  msg: any;  // Ideally, you should define a stricter type for msg instead of any.
  query: string;
  promptStyleString: string;
  handleMessageUpdate: (id: any, message: string) => void; // You can define stricter types here too.
};


const Message:React.FC<MessageProps> = ({ msg, query, promptStyleString, handleMessageUpdate }) => {
  const { messageCardState: { isFlipped, animationPlayed }, flipCard, setAnimationPlayed } = useMessageCardState(msg.id);

  const cardClass = msg.author.id === 'User' ? `${styles.userCard}` : `${styles.authorCard}`;

  // useEffect(() => {
  //   if (msg.message) {
  //     flipCard();
  //   }
  // }, [msg.message]);

  return (
    <Card
      className={`${styles.cardContainer} ${cardClass}`}
      key={msg.id}
      fluid
      style={{
        maxWidth: '80%',
        margin: msg.author.id === 'User' ? '0 0 1em 20%' : '0 20% 1em 0'
     }}
      onClick={flipCard}
    >
      <Card.Content style={{ padding: '1em', position: 'relative' }}>
        {msg.author.id !== 'User' && (
          // <Label as='a' corner='left' icon={{name:'favorite', color:'black'}} style={{backgroundColor: 'black'}} onClick={handleFavoriteClick} />
            <FavoriteStar 
            msgId={msg.id}
            author={msg.author.id}
            messageContent={msg.message}
            sourceTitle={msg.title}
            sourceHeading={msg.heading}
            sourceContent={msg.content}
            sourceSummaries={msg.summaries}
            sourceMetasummary={msg.metasummary}
            payload={msg.payload}
            query={msg.query}
            promptStyleString={promptStyleString}
          />
        )}
        <Grid>
          {msg.author.id === 'User' ? (
            <>
              <Grid.Column width={13} textAlign='left'>
                <Card.Description style={{ wordWrap: 'break-word', color: 'black', fontSize: '16px' }}>
                    {msg.message}
                </Card.Description>
              </Grid.Column>
              <Grid.Column width={3} style={{ marginLeft: '-1em' }}>
                <Image src={`/images/${msg.author.id}.png`} fluid />
              </Grid.Column>
            </>
          ) : (
            <AuthorMessage msg={msg} isFlipped={isFlipped} animationPlayed={animationPlayed} setAnimationPlayed={setAnimationPlayed} />
          )}
        </Grid>
      </Card.Content>
    </Card>
  );
};

export default Message;

