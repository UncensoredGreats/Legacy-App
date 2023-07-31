// AnimatedSourceCards.tsx
import React from 'react';
import { Transition } from 'semantic-ui-react';
import SourceCards from './SourceCards';

interface Message {
  author: {
    id: string;
  };
}

interface AnimatedSourceCardsProps {
  msg: Message;
  isFlipped: boolean;
  authorId: string;
  title: string[];
  content: string[];
  heading: string[];
  summaries: string[];
  metasummary: string[];
  animationPlayed: boolean;
  setAnimationPlayed: (played: boolean) => void;
}

const AnimatedSourceCards: React.FC<AnimatedSourceCardsProps> = ({ 
    msg, 
    isFlipped, 
    title, 
    heading, 
    content, 
    summaries, 
    metasummary, 
    animationPlayed, 
    setAnimationPlayed 
  }) => {
  return (
    <Transition.Group animation='horizontal flip' duration={0.2} >
      {isFlipped ? (
        <>
          <div key='cardFront'>
            <SourceCards authorId={`${msg.author.id}`} title={title} content={content} heading={heading} summaries={summaries} metasummary={metasummary} animationPlayed={animationPlayed} setAnimationPlayed={setAnimationPlayed} />
          </div>
          <div key='cardBack'>
            {/* content when the card is not flipped */}
          </div>
        </>
      ) : (
        <div key='cardDefault'>
          {/* content when the card is flipped */}
        </div>
      )}
    </Transition.Group>
  );
};

export default AnimatedSourceCards;






