/**
ActiveChatContext.tsx
Create a context named "ActiveChatContext" with two properties:

"activeChat" (string or null)
"setActiveChat" (function that accepts a string or null and returns void)
Create a component named "ActiveChatProvider" that takes children as props:

Initialize "activeChat" state as null
Render the ActiveChatContext.Provider component with the "value" prop set to { activeChat, setActiveChat } and wrap the "children" inside it
Create a custom hook named "useActiveChat":

Use the useContext hook to retrieve the value from the ActiveChatContext
If the context is null, throw an error with the message "useActiveChat must be used within a ActiveChatProvider"
Return the retrieved context
Export the components "ActiveChatProvider" and "useActiveChat" as the default exports.

 */
// OG version
// import React, { createContext, useState, useContext, Dispatch, SetStateAction } from 'react';

// interface ActiveChatContextProps {
//   activeChat: string | null;
//   setActiveChat: Dispatch<SetStateAction<string | null>>;
// }

// const defaultSetActiveChat = () => {
//   throw new Error("setActiveChat function must be overridden by the Provider");
// };

// const ActiveChatContext = createContext<ActiveChatContextProps>({
//   activeChat: null,
//   setActiveChat: defaultSetActiveChat,
// });

// const ActiveChatProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
//   const [activeChat, setActiveChat] = useState<string | null>(null);
//   return (
//     <ActiveChatContext.Provider value={{ activeChat, setActiveChat }}>
//       {children}
//     </ActiveChatContext.Provider>
//   );
// };

// const useActiveChat = () => {
//   const context = useContext(ActiveChatContext);
//   if (!context) {
//     throw new Error('useActiveChat must be used within a ActiveChatProvider');
//   }
//   return context;
// };

// export { ActiveChatProvider, useActiveChat };











// Version introducing flip states for the message cards.
import React, { createContext, useState, useContext, Dispatch, SetStateAction } from 'react';

interface ActiveChatContextProps {
  activeChat: string | null;
  setActiveChat: Dispatch<SetStateAction<string | null>>;
  messageCardStates: Record<string, boolean>; // map message ids to flip states
  setMessageCardStates: Dispatch<SetStateAction<Record<string, boolean>>>;
  flipMessageCard: (id: string) => void; // function to flip a message card
}

// default function to throw an error if it hasn't been overridden
const defaultFunction: (...args: any[]) => void = () => {
  throw new Error("Function must be overridden by the Provider");
};

const ActiveChatContext = createContext<ActiveChatContextProps>({
  activeChat: null,
  setActiveChat: defaultFunction,
  messageCardStates: {},
  setMessageCardStates: defaultFunction,
  flipMessageCard: defaultFunction,
});

const ActiveChatProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messageCardStates, setMessageCardStates] = useState<Record<string, boolean>>({});

  const flipMessageCard = (id: string) => {
    setMessageCardStates(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  }

  return (
    <ActiveChatContext.Provider value={{ activeChat, setActiveChat, messageCardStates, setMessageCardStates, flipMessageCard }}>
      {children}
    </ActiveChatContext.Provider>
  );
};

const useActiveChat = () => {
  const context = useContext(ActiveChatContext);
  if (!context) {
    throw new Error('useActiveChat must be used within a ActiveChatProvider');
  }
  return context;
};

export { ActiveChatProvider, useActiveChat };

