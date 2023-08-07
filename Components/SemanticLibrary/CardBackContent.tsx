// import React from 'react';
// import { Icon } from 'semantic-ui-react';

// interface CardBackContentProps {
//   currentAuthor: {
//     id?: string;
//   };
//   title: string;
//   handleClick: (index: number, type: string) => void;
//   handleReadBookClick: (authorId: string, title: string) => void;
//   index: number;
// }

// const CardBackContent: React.FC<CardBackContentProps> = ({ currentAuthor, title, handleClick, handleReadBookClick, index }) => {
//   return (
//     <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
//       <div onClick={() => handleClick(index, 'quotes')}>
//         <Icon name='quote left' size='large' />
//         <p>View key sentences</p>
//       </div>
//       <div onClick={() => handleClick(index, 'page')}>
//         <Icon name='file text' size='large' />
//         <p>Read snippet</p>
//       </div>
//       <div onClick={() => handleReadBookClick(currentAuthor.id, title)}>
//         <Icon name='book' size='large' />
//         <p>Read the whole book</p>
//       </div>
//     </div>
//   );
// };

// export default CardBackContent;




import React from 'react';
import { Icon } from 'semantic-ui-react';

interface CardBackContentProps {
  currentAuthor: {
    id?: string;
  };
  title: string;
  handleClick: (index: number, type: string) => void;
  handleReadBookClick: (authorId: string, title: string) => void;
  index: number;
  summaries: string[][];
  contents: string[];
}

const CardBackContent: React.FC<CardBackContentProps> = ({ currentAuthor, title, handleClick, handleReadBookClick, index, summaries, contents }) => {
  const [activeTab, setActiveTab] = React.useState('quotes');

  return (
    <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
      <div onClick={() => setActiveTab('quotes')}>
        <Icon name='quote left' size='large' />
        <p>View key sentences</p>
      </div>
      {activeTab === 'quotes' && summaries[index] && (
        <ul>
          {summaries[index].map((sentence, sIndex) => (
            <li key={sIndex} style={{ marginBottom: '10px' }}>{sentence.trim()}</li>
          ))}
        </ul>
      )}
      <div onClick={() => setActiveTab('page')}>
        <Icon name='file text' size='large' />
        <p>Read snippet</p>
      </div>
      {activeTab === 'page' && contents[index] && <p>{contents[index]}</p>}
      <div onClick={() => handleReadBookClick(currentAuthor.id, title)}>
        <Icon name='book' size='large' />
        <p>Read the whole book</p>
      </div>
    </div>
  );
};

export default CardBackContent;
