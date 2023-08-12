// Added Summaries to the SourceCards
import React from 'react';
import { handleReadBookClick } from '../../utils/handleReadBookClick';
import { Card, Button } from 'semantic-ui-react';
import { useState, useEffect } from 'react';


type SourceCardsProps = {
  authorId: string;
  title: string[];
  heading: string[];
  content: string[];
  summaries: string[];
  metasummary: string[];
  animationPlayed: boolean;
  setAnimationPlayed: React.Dispatch<React.SetStateAction<boolean>>;
}


const processSources = (title, content, summaries) => {
  const sources = title.map((t, index) => ({
    title: t,
    content: content[index],
    summary: Array.isArray(summaries[index]) ? summaries[index].join('. ') : summaries[index],
  }));

  return sources;
};


const SourceCards: React.FC<SourceCardsProps> = ({  authorId, title, heading, content, summaries, metasummary, animationPlayed, setAnimationPlayed }) => {

  const sources = processSources(title, content, summaries);
  const [isFlipped, setFlipped] = useState(sources.map(() => false));
  const [visibleIndex, setVisibleIndex] = useState(animationPlayed ? sources.length - 1 : -1);
  const [showFullText, setShowFullText] = useState(sources.map(() => false));

  useEffect(() => {
    if (!animationPlayed) {
      const timerId = setTimeout(() => {
        setVisibleIndex(sources.length - 1);
        setAnimationPlayed(true);
      }, 1);
      return () => clearTimeout(timerId);
    }
  }, [animationPlayed, sources.length]);


  useEffect(() => {
    if (visibleIndex >= sources.length - 1 && !animationPlayed) {
      setAnimationPlayed(true);
    }
  }, [visibleIndex, sources.length, animationPlayed, setAnimationPlayed]);

  const handleClick = (event, index) => {
    event.stopPropagation();
    const newFlippedStatus = [...isFlipped];
    newFlippedStatus[index] = !newFlippedStatus[index];
    setFlipped(newFlippedStatus);
  };

  const handleReadBook = (event, index) => {
    event.stopPropagation();
    handleReadBookClick(authorId, sources[index].title);
};
  
  
  const toggleFullText = (event, index: number) => {
    event.stopPropagation();
    const newShowFullText = [...showFullText];
    newShowFullText[index] = !newShowFullText[index];
    setShowFullText(newShowFullText);


  const handleCardClick = (event) => {
  event.stopPropagation();
  document.body.style.fontFamily = "Times New Roman";
  document.body.style.color = "black";
  }
}

  return (
    <Card.Group itemsPerRow={1}>
      {sources.map((source, index) => (
        <Card 
          key={index} 
          onClick={(event) => handleClick(event, index)}
          style={{
            opacity: index <= visibleIndex ? 1 : 0,
            transition: 'opacity 1s ease-out',
          }}
        >
          <Card.Content>
            <Card.Header>{isFlipped[index] ? source.title : source.title}</Card.Header>
            <Card.Meta>{"Page " + heading[index]}</Card.Meta>
          </Card.Content>
          {isFlipped[index] && (
            <React.Fragment>
              <Card.Content style={{ fontFamily: 'Times New Roman', fontSize: '15px', color: 'black' }}>
                {showFullText[index] ? source.content : source.summary}
              </Card.Content>
              {/* <Card.Content>
                <div className='ui two buttons'>
                  <Button basic color='blue' onClick={(event) => { event.stopPropagation(); toggleFullText(event, index); }}>{showFullText[index] ? 'Show Summary' : 'Show Full Text'}</Button>                 
                  <Button basic color='black' onClick={(event) => handleReadBookClick(event, index)}>Primary Source</Button>
                </div>
              </Card.Content> */}
              <Card.Content>
                  <div className='ui two buttons'>
                      <Button basic color='blue' onClick={(event) => { event.stopPropagation(); toggleFullText(event, index); }}>{showFullText[index] ? 'Show Summary' : 'Show Full Text'}</Button>                 
                      <Button basic color='black' onClick={(event) => handleReadBook(event, index)}>Primary Source</Button>
                  </div>
              </Card.Content>
            </React.Fragment>
          )}
        </Card>
      ))}
    </Card.Group>
  );
};

export default SourceCards;
