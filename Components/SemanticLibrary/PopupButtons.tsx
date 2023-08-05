import React, { CSSProperties } from 'react';
import { Icon, Popup } from 'semantic-ui-react';

interface PopupButtonsProps { 
    currentAuthor: any;
    title: any;
    handleClick: any;
    handleReadBookClick: any;
    index: any;
    isActive?: boolean; 
}

const PopupButtons: React.FC<PopupButtonsProps> = ({ currentAuthor, title, handleClick, handleReadBookClick, index, isActive }) => {
  const slideOutStyle: CSSProperties = {
      transform: isActive ? 'translateY(0)' : 'translateY(100%)',
      transition: 'transform 0.3s ease-out',
      backgroundColor: 'white',
      zIndex: 10,
      width: '100%',
      position: 'absolute',
      bottom: '10px',
      padding: '10px',
  };

  return (
      <div style={slideOutStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Popup content="View key sentences" trigger={<Icon name='quote left' size='large' onClick={() => handleClick(index, 'quotes')} />} />
              <Popup content="Read snippet" trigger={<Icon name='file text' size='large' onClick={() => handleClick(index, 'page')} />} />
              <Popup content="Read the whole book" trigger={<Icon name='book' size='large' onClick={() => handleReadBookClick(currentAuthor.id, title)} />} />
          </div>
      </div>
  );
};

export default PopupButtons;
