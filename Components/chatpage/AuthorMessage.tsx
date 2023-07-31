import React from 'react';
import { Card, Grid, Image, Transition, Label } from 'semantic-ui-react';
import SourceCards from '../Cards/SourceCards';



const AuthorMessage = ({ msg, isFlipped, animationPlayed, setAnimationPlayed }) => {

  return (
    <>
      <Grid.Column width={3} style={{ marginRight: '-0.3em' }}>
        <Image src={`/images/${msg.author.id}.png`} fluid />
        <Card.Meta textAlign='center' style={{ fontSize: '1em', padding: '0.3em' }}>{msg.author.id}</Card.Meta>
      </Grid.Column>
      <Grid.Column width={13}>
        <Transition.Group animation='horizontal flip' duration={500} >
          {isFlipped ? (
            <div key='cardBack'>
              <Label as='a' color='teal' ribbon='right' style={{ marginLeft: '4.8px', marginBottom: '10px' }}>
                Sources by Relevance
              </Label>
              {(
                <SourceCards
                  authorId={msg.author.id}
                  title={msg.title}
                  heading={msg.heading}
                  content={msg.content}
                  summaries={msg.summaries}
                  metasummary={msg.metasummary}
                  animationPlayed={animationPlayed || false}
                  setAnimationPlayed={setAnimationPlayed}
                />
              )}
            </div>
          ) : (
            <div key='cardFront'>
              <Card.Description style={{ wordWrap: 'break-word', color: 'black', fontSize: '16px' }}>
                {msg.message}
              </Card.Description>
            </div>
          )}
        </Transition.Group>  
      </Grid.Column>
    </>
  );
};

export default AuthorMessage;




