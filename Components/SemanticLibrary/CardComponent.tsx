// import React, { useState } from 'react';
// import CardBackContent from './CardBackContent';

// interface CardComponentProps {
//   currentAuthor: {
//     id?: string;
//   };
//   title: string;
//   imagePath: string;
//   heading: string;
//   index: number;
//   isActive: boolean;
//   handleClick: (index: number, type: string) => void;
//   handleReadBookClick: (authorId: string, title: string) => void;
// }

// const CardComponent: React.FC<CardComponentProps> = (props) => {
//   const { currentAuthor, title, imagePath, heading, index, isActive, handleClick, handleReadBookClick } = props;
//   const [isFlipped, setIsFlipped] = useState(false);

//   return (
//     <div style={{
//       backgroundColor: '#f9f7f4',
//       borderRadius: '10px',
//       overflow: 'visible',
//       boxShadow: '0px 0px 15px rgba(0,0,0,0.15)',
//       transition: 'transform 0.3s',
//       position: 'relative',
//       paddingBottom: '20px',
//       transform: isFlipped ? 'rotateY(180deg)' : 'none',
//       transformStyle: 'preserve-3d',
//       width: '100%', 
//       height: '100%'
//     }}>
//       <div style={{ backfaceVisibility: 'hidden', width: '100%', height: '100%' }}>
//         <img src={imagePath} alt={`${currentAuthor?.id}`} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
//         <div style={{ padding: '20px' }}>
//           <h2 style={{ fontSize: '1.3em', marginBottom: '10px', fontWeight: 'bold' }}>{title}</h2>
//           <p><em>{currentAuthor?.id} | Page {heading}</em></p>
//           <button onClick={() => setIsFlipped(true)}>Flip Icon</button> {/* Replace "Flip Icon" with your preferred flip icon component */}
//         </div>
//       </div>
//       <div style={{ position: 'absolute', top: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', width: '100%', height: '100%' }}>
//         <CardBackContent {...{ currentAuthor, title, handleClick, handleReadBookClick, index, isActive }} />
//         <button onClick={() => setIsFlipped(false)} style={{ position: 'absolute', bottom: '20px', right: '20px' }}>Flip Icon</button> {/* Replace "Flip Icon" with your preferred flip icon component */}
//       </div>
//     </div>
//   );
// };

// export default CardComponent;










import React, { useState } from 'react';
import CardBackContent from './CardBackContent';

interface CardComponentProps {
  currentAuthor: {
    id?: string;
  };
  title: string;
  imagePath: string;
  heading: string;
  index: number;
  isActive: boolean;
  handleClick: (index: number, type: string) => void;
  handleReadBookClick: (authorId: string, title: string) => void;
  summaries: string[][];
  contents: string[];
}

const CardComponent: React.FC<CardComponentProps> = (props) => {
  const { currentAuthor, title, imagePath, heading, index, isActive, handleClick, handleReadBookClick, summaries, contents } = props;
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div style={{
      backgroundColor: '#f9f7f4',
      borderRadius: '10px',
      overflow: 'visible',
      boxShadow: '0px 0px 15px rgba(0,0,0,0.15)',
      transition: 'transform 0.3s',
      position: 'relative',
      paddingBottom: '20px',
      transform: isFlipped ? 'rotateY(180deg)' : 'none',
      transformStyle: 'preserve-3d',
      width: '100%', 
      height: '100%'
    }}>
      <div style={{ backfaceVisibility: 'hidden', width: '100%', height: '100%' }}>
        <img src={imagePath} alt={`${currentAuthor?.id}`} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
        <div style={{ padding: '20px' }}>
          <h2 style={{ fontSize: '1.3em', marginBottom: '10px', fontWeight: 'bold' }}>{title}</h2>
          <p><em>{currentAuthor?.id} | Page {heading}</em></p>
          <button onClick={() => setIsFlipped(true)}>Flip Icon</button> {/* Replace "Flip Icon" with your preferred flip icon component */}
        </div>
      </div>
      <div style={{ position: 'absolute', top: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', width: '100%', height: '100%' }}>
        <CardBackContent {...{ currentAuthor, title, handleClick, handleReadBookClick, index, summaries, contents }} />
        <button onClick={() => setIsFlipped(false)} style={{ position: 'absolute', bottom: '20px', right: '20px' }}>Flip Icon</button> {/* Replace "Flip Icon" with your preferred flip icon component */}
      </div>
    </div>
  );
};

export default CardComponent;
