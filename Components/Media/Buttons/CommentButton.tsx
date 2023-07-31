import React from 'react';
import { Button, Icon, Popup } from 'semantic-ui-react';
import { toast } from 'react-toastify';

const CommentButton = () => {
  const handleCommentClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    
    toast("Commenting will be available soon!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <Popup
        trigger={
            <Button 
                icon 
                color="olive" 
                size="mini" 
                style={{ margin: '0.3em' }}
                onClick={handleCommentClick}
            >
                <Icon name='comments'/>
            </Button>
        }
        content='Comments'
        position='top center'
    />
  );
};

export default CommentButton;
