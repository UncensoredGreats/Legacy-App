// import React from 'react';
import { Input, Button } from 'semantic-ui-react';

const ChatInput = ({ userMessage, setUserMessage, handleSubmit }) => {
  const characterLimit = 500;

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && userMessage.length > 0 && userMessage.length <= characterLimit) {
      handleSubmit();
    }
  }

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    // Only update if it doesn't exceed the character limit
    if (inputValue.length <= characterLimit) {
      setUserMessage(inputValue);
    }
  }

  return (
    <Input
      action={
        <Button 
          color='blue' 
          onClick={handleSubmit} 
          disabled={userMessage.length === 0 || userMessage.length > characterLimit}
        >
          Send
        </Button>
      }
      type="text"
      name='message'
      placeholder='Ask me anything...'
      value={userMessage}
      fluid
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
    />
  );
};

export default ChatInput;

