import React from 'react';
import PopupButtons from './PopupButtons';

interface CardComponentProps {
  currentAuthor: any;
  title: string;
  imagePath: string;
  heading: string;
  index: number;
  isActive: boolean;
  handleClick: any;
  handleReadBookClick: any;
}

const CardComponent: React.FC<CardComponentProps> = ({ currentAuthor, title, imagePath, heading, index, isActive, handleClick, handleReadBookClick }) => {
  return (
    <div style={{ backgroundColor: '#f9f7f4', borderRadius: '10px', overflow: 'hidden', boxShadow: '0px 0px 15px rgba(0,0,0,0.15)', transition: 'transform 0.3s', position: 'relative', paddingBottom: '80px' }}>
      <img src={imagePath} alt={`${currentAuthor?.id}`} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      <div style={{ padding: '20px' }}>
        <h2 style={{ fontSize: '1.3em', marginBottom: '20px' }}>{title}</h2>
        <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
          <p><em>{currentAuthor?.id} | Page {heading}</em></p>
          <PopupButtons currentAuthor={currentAuthor} title={title} handleClick={handleClick} handleReadBookClick={handleReadBookClick} index={index} isActive={isActive}/>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
