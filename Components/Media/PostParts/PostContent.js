// PostContent.js
import React from 'react';
import { Button, Grid, Icon, Card, Transition, Label, Divider } from 'semantic-ui-react';
import SourceCards from '../../Cards/SourceCards';
import { processMetasummary } from '../../chatpage/processMetasummary';

const PostContent = ({ authorId, isFlipped, userQuestion, post, sourceTitle, sourceHeading, sourceContent, sourceSummaries, sourceMetasummary, animationPlayed, setAnimationPlayed, showMetaSummary, flipCard, setShowMetaSummary }) => {
  
  const processedSummary = processMetasummary(post.source_metasummary);

  return (
    <>
      <Grid.Row centered>
        <Card.Description style={{ wordWrap: 'break-word', color: 'black', fontSize: '16px', fontWeight: 'bold', fontFamily: 'Lato', padding: '0 5px' }}>
          {userQuestion}
        </Card.Description>
      </Grid.Row>
      <Divider />

      <Grid.Row centered style={{ padding: '10px 0' }}>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
              <Button.Group style={{ flexGrow: 1, marginLeft: '15px' }}>
                  <Button compact active={!showMetaSummary} onClick={() => setShowMetaSummary(false)}>AI Output</Button>
                  <Button.Or />
                  <Button compact active={showMetaSummary} onClick={() => setShowMetaSummary(true)}>AI Input</Button>
              </Button.Group>
              <Button basic onClick={flipCard} style={{ marginLeft: '15px', marginRight: '20px' }}>
                  <Icon name='redo' color='black' size='large' />
              </Button>
          </div>
      </Grid.Row>

      {/* <Divider /> */}
      <Transition.Group animation='horizontal flip' duration={500}>
        {isFlipped ? (
          <div key='cardBack' style={{ paddingBottom: '20px' }}>
            <Label as='a' color='teal' ribbon='right' style={{ marginLeft: '4.8px', marginBottom: '10px' }}>
              Sources by Relevance
            </Label>
            <SourceCards 
              authorId={authorId}
              title={sourceTitle} 
              heading={sourceHeading} 
              content={sourceContent} 
              summaries={sourceSummaries} 
              metasummary={sourceMetasummary} 
              animationPlayed={animationPlayed || false} 
              setAnimationPlayed={setAnimationPlayed} 
            />
          </div>
        ) : (
          <div key='cardFront'>
            <Card.Description style={{ wordWrap: 'break-word', color: 'black', fontSize: '16px', padding: '0px 0px 16px 0px' }}>
              {showMetaSummary ? processedSummary : post.message_content}
            </Card.Description>
          </div>
        )}
      </Transition.Group>
    </>
  )
}

export default PostContent;

