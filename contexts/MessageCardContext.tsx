// MessageCardContext.tsx

import React, { useState, createContext, useContext, ReactNode } from 'react';

interface MessageCardState {
  isFlipped?: boolean;
  animationPlayed?: boolean;
}

interface MessageCardContextProps {
  messageCardState: Record<string, MessageCardState>;
  setMessageCardState: React.Dispatch<React.SetStateAction<Record<string, MessageCardState>>>;
}

const MessageCardContext = createContext<MessageCardContextProps>({
  messageCardState: {},
  setMessageCardState: () => {},
});

interface MessageCardProviderProps {
  children: ReactNode;
}

const MessageCardProvider: React.FC<MessageCardProviderProps> = ({ children }) => {
  const [messageCardState, setMessageCardState] = useState<Record<string, MessageCardState>>({});

  return (
    <MessageCardContext.Provider value={{ messageCardState, setMessageCardState }}>
      {children}
    </MessageCardContext.Provider>
  );
};

const useMessageCardState = (id: string) => {
  const { messageCardState, setMessageCardState } = useContext(MessageCardContext);
  const defaultState = messageCardState[id] || { isFlipped: false, animationPlayed: false };
  const state = { ...defaultState, ...messageCardState[id] };

  const flipCard = () => {
    setMessageCardState((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        isFlipped: !prevState[id]?.isFlipped,
      },
    }));
  };

  const setAnimationPlayed = (played: boolean) => {
    setMessageCardState((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        animationPlayed: played,
      },
    }));
  };

  return {
    messageCardState: state,
    flipCard,
    setAnimationPlayed,
  };
};

export { MessageCardProvider, useMessageCardState };
