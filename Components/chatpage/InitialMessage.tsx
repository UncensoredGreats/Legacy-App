import React from 'react';
import { Card, Grid, Image, Transition } from 'semantic-ui-react';
import styles from '../../styles/Messages.module.css';

const InitialMessage = ({ author }) => {
  if (!author || !author.image) {
    // handle the situation here - either return null, some default content, or a loading spinner
    return null;
  }

  return (
    <Card
      className={`${styles.cardContainer} ${styles.authorCard}`}
      fluid
      style={{
        maxWidth: '80%',
        margin: '0 20% 1em 0'
      }}
    >
      <Card.Content style={{ padding: '1em', position: 'relative' }}>
        <Grid>
          <Grid.Column width={3} style={{ marginRight: '-0.3em' }}>
            <Image src={`/images/${author.id}.png`} fluid />
            <Card.Meta textAlign='center' style={{ fontSize: '1em', padding: '0.3em' }}>{author.id}</Card.Meta>
          </Grid.Column>
          <Grid.Column width={13}>
            <Transition.Group animation='horizontal flip' duration={500} >
              <div key='cardFront'>
                <Card.Description style={{ wordWrap: 'break-word', color: 'black', fontSize: '16px' }} dangerouslySetInnerHTML={{ __html:
                  `
                  <br />
                  Greetings! I represent ${author.id}, brought to life in the digital realm, unlike a conventional chatbot though, Every response of mine is derived from my very own writings. <br /> <br />
                  Curious about the origins of my replies? Click on them to trace back to their primary sources. If a particular one intrigues you, another click lets you delve into the complete ebook. <br /> <br />
                  Stumble upon a revelation? Click the star to preserve it in your library, and consider sharing it with the Uncensored Greats Community. <br /> <br />
                  How true I am to my original works (and how narrow my knowledge scope), is up to you and can be changed at any time in the settings. <br /> <br />
                  Let's uncover some truths together! <br /> <br />
                  `
                }}/>
              </div>
            </Transition.Group>
          </Grid.Column>
        </Grid>
      </Card.Content>
    </Card>
  );
};

export default InitialMessage;
