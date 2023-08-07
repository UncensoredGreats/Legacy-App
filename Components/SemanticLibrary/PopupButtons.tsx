import React, { CSSProperties } from 'react';
import { Icon, Popup } from 'semantic-ui-react';

interface PopupButtonsProps {
    currentAuthor: {
      id?: string;
    };
    title: string;
    handleClick: (index: number, type: string) => void;
    handleReadBookClick: (authorId: string, title: string) => void;
    index: number;
    isActive?: boolean;
  }
  

  const PopupButtons: React.FC<PopupButtonsProps> = ({ currentAuthor, title, isActive, handleClick, handleReadBookClick, index }) => {
    const slideOutStyle: CSSProperties = {
      transform: isActive ? 'translateY(0)' : 'translateY(100%)',
      transition: 'transform 0.3s ease-out',
      backgroundColor: 'white',
      zIndex: 10,
      width: '100%',
      position: 'absolute',
      bottom: '-80px', // Adjust as per your needs
      padding: '10px',
      borderRadius: '10px',
      boxShadow: '0px 0px 15px rgba(0,0,0,0.15)'
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


