// OG (before rate limiting goes into component.)

import React, { useState, useEffect } from 'react';
import { Card, Grid, Icon } from 'semantic-ui-react';
import Message from '../Components/chatpage/Message';
import ChatInput from '../Components/chatpage/ChatInput';
import InitialMessage from '../Components/chatpage/InitialMessage';
import { MessageCardProvider } from '../contexts/MessageCardContext';
import useSendMessage from '../Components/chatpage/useSendMessage';
import { createClient } from '@supabase/supabase-js';
import { getCurrentUserId } from '../Components/supadb/getCurrentUserId';
import chatScrollBackground from '../hooks/chatScrollBackground'
import useRequestLimit from '../Components/chatpage/useRequestLimit'
import { processMetasummary } from '../Components/chatpage/processMetasummary';
import SettingsModal from '../Components/chatpage/SettingsModal';
import createPayload from '../Components/chatpage/PayloadCreator';
import Layout from '../Components/homepageMenu/Layout';
import HeaderProp from '../Components/homepageMenu/header';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const fetchOpenai = async (query, authorId, scope, contents, payload, breadth) => {

  const body = {
    contentString: `${query}\n${contents}`,
    query: query,
    authorId: authorId,
    scope: scope,
    payload: payload,
    breadth: breadth,
  };

  const response = await fetch('/api/messages/openai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  }); 

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.body;
};


const ChatPage = ({ author }) => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Settings Modal States:
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [promptStyle, setPromptStyle] = useState(1);


  const [maxTokens, setMaxTokens] = useState(() => typeof window !== 'undefined' ? Number(localStorage.getItem('maxTokens')) || 400 : 400);
  const [temperature, setTemperature] = useState(() => typeof window !== 'undefined' ? Number(localStorage.getItem('temperature')) || 0.7 : 0.7);
  const [breadth, setBreadth] = useState(() => typeof window !== 'undefined' ? Number(localStorage.getItem('breadth')) || 4 : 4);


  useEffect(() => {
    setMaxTokens(Number(localStorage.getItem('maxTokens')) || 500);
    setTemperature(Number(localStorage.getItem('temperature')) || 0.7);
    setBreadth(Number(localStorage.getItem('breadth')) || 4);
  }, []);

  // Use useEffect to store the settings whenever they change
  useEffect(() => {
    localStorage.setItem('maxTokens', maxTokens.toString());
    localStorage.setItem('temperature', temperature.toString());
    localStorage.setItem('breadth', breadth.toString());
  }, [maxTokens, temperature, breadth]);
  
  const { isRateLimited, checkRateLimit } = useRequestLimit();

  const handleOpenSettings = () => {
    setSettingsOpen(true);
  };

  const handleCloseSettings = () => {
    setSettingsOpen(false);
  };

  // Check if user is authenticated on component mount and update
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(session ? true : false);
    });
    setIsAuthenticated(supabase.auth.getUser() ? true : false);
  }, []);

  chatScrollBackground('#imageContainer');

  const onSuccess = async (weaviateResult) => {
    const tempMessageId = Date.now() + 1;
    const settings = { maxTokens, temperature }; 
    const processedMetasummary = processMetasummary(weaviateResult.metasummary);
    // const payload = createPayload(processedMetasummary, author.id, userMessage, query, settings);
    const { payload, query, promptStyleString } = createPayload(
      processedMetasummary, 
      author.id, 
      userMessage, 
      settings, 
      promptStyle
  );

    setMessages((prevMessages) => [
      ...prevMessages,
      { 
        // ...weaviateResult,
        id: tempMessageId, 
        message: "", 
        author: { id: author.id, image: author.image },
        payload: payload,
        title: weaviateResult.titles,
        content: weaviateResult.contents,
        heading: weaviateResult.headings,
        summaries: weaviateResult.summaries,
        metasummary: weaviateResult.metasummary,
        query: query,
        promptStyleString: promptStyleString
      }
    ]);
    
  
    const data = await fetchOpenai(userMessage, author.id, `${author.cluster}`, weaviateResult.contents.join(' '), payload, breadth);
    if (!data) {
      throw new Error('No data received');
    }
  
    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let tempMessage = '';
  
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      tempMessage += chunkValue;
  
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === tempMessageId ? { ...msg, message: tempMessage } : msg
        )
      );
    };
  };
    const onError = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Date.now() + 1, message: "Sorry, there were technical difficulties.", author }
    ]);
  };

  const mutation = useSendMessage({ onSuccess, onError });
  
  const handleSubmit = async () => {
    const query = userMessage;
    let userId = await getCurrentUserId();

  await checkRateLimit(userId);

    if (isRateLimited) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now() + 1, message: "You've reached our rate limit, and if you're a real human I'm so happy to see you're getting good use out of this site! I'd love to hear from you and how you've been using the site so please reach out (evan@uncensoredgreats.com) and I'll try my best to fix it. If you're a bot, there's nothing for you here so fuck off.", author }
      ]);
      setUserMessage('');
      return;
    }
  
    // Add user's message to the chat immediately
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: Date.now(), 
        message: userMessage,
        query: userMessage, 
        author: { id: 'User', image: 'chad.png' },
      }
    ]);
  
    // If the user is not authenticated, add a system message and return early
    if (!isAuthenticated) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now() + 1, message: "Sorry, you have to sign in on the homepage to use the AI. All you need is an email, and we will never send you promotional emails or anything of the sort, but we do need that to ensure you are a human :)", author }
      ]);
      setUserMessage('');
      return;
    }

    // If the user is authenticated, send the message
    mutation.mutate({ query, scope: `${author.cluster}`, breadth });
  
    setUserMessage('');
  };

  
  const handleMessageUpdate = (id, message) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, message: message } : msg
      )
    );
  };

  return (
    <MessageCardProvider>

      <div style={{ height: '100vh', margin: 0, padding: 0 }}>
        <HeaderProp/>
        <SettingsModal 
          maxTokens={maxTokens}
          onChangeMaxTokens={setMaxTokens}
          temperature={temperature}
          onChangeTemperature={setTemperature}
          breadth={breadth}
          onChangeBreadth={setBreadth}
          open={settingsOpen}
          onClose={handleCloseSettings}
          promptStyle={promptStyle}
          onChangePromptStyle={setPromptStyle}
        />
        {/* <Layout> */}
        <Grid centered style={{ padding: '0', margin: '0', height: '100%' }}>
        
          <Grid.Column mobile={16} tablet={16} computer={12} style={{ padding: '0px', margin: '0px' }}>
          
          

            <Card raised fluid style={{ 
              margin: '0',
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              position: 'relative',
            }}>
              <Icon bordered color='grey' name='settings' size='big' onClick={handleOpenSettings} style={{ position: 'fixed', right: '1em', top: '1em', zIndex: 1000 }} />
              <div 
                id="imageContainer"
                style={{ 
                  backgroundImage: `url('/images/BlackedOut.png')`,
                  backgroundSize: 'cover',
                  backgroundAttachment: 'fixed',
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  opacity: '0.2',
              }}/>
              <Card.Content style={{ flexGrow: 1, overflowY: 'auto', position: 'relative' }}>
                <InitialMessage author={author} />
                {messages.map((msg) => {
                  return (
                    <Message key={msg.id} msg={msg} query={msg.query} promptStyleString={msg.promptStyleString} handleMessageUpdate={handleMessageUpdate} />
                  );
                })}                
              </Card.Content>
              <div style={{ padding: '2em' }}>
                <ChatInput userMessage={userMessage} setUserMessage={setUserMessage} handleSubmit={handleSubmit} />
              </div>
            
            </Card>
            
          </Grid.Column>
         
        </Grid>
      {/* </Layout>   */}
      </div>
    </MessageCardProvider>
  );
};

export default ChatPage;

