// Added Summaries to the SourceCards
import React from 'react';
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

  const handleReadBookClick = (event, index) => {
    event.stopPropagation();
  
    const currentSourceTitle = sources[index].title;
    const titleClustered = currentSourceTitle.split(" ").join("_");
    const authorLink = authorId.split(" ").join("_");
  
    let bookUrl = '';
  
    // Check the authorId and decide the URL accordingly
    if (authorLink === "Grecko_Romans") {
      window.open("https://classics.mit.edu/Browse/index.html", '_blank');
      return; // stop execution after opening the URL
    } else if (authorLink === "Carl_Jung") {
      window.open("https://archive.org/details/jung-carl-gustav-complete/01%20Psychiatric%20Studies/", '_blank');
      return; // stop execution after opening the URL
    } else {
      bookUrl = `https://uncensoredgreatsebooks.s3.us-east-2.amazonaws.com/${authorLink}/${authorLink}@@${titleClustered}.epub`;
    }
  
    let readerAppUrl = "https://master.d2lzkrj4epm0ch.amplifyapp.com/";
    let url = new URL(readerAppUrl);
    url.searchParams.set("bookPath", bookUrl);
    window.open(url.href, '_blank');
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
              <Card.Content>
                <div className='ui two buttons'>
                  <Button basic color='blue' onClick={(event) => { event.stopPropagation(); toggleFullText(event, index); }}>{showFullText[index] ? 'Show Summary' : 'Show Full Text'}</Button>
                  {/* <Button basic color='black' onClick={handleReadBookClick}>Read in Book</Button> */}
                  <Button basic color='black' onClick={(event) => handleReadBookClick(event, index)}>Primary Source</Button>
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
