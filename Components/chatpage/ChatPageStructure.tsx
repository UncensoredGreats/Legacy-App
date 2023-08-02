// import React from 'react'; // Assuming you are using React
// import { MessageCardProvider } from '../../contexts/MessageCardContext';
// import SettingsModal from './SettingsModal';




// export default function MyComponent() {
//     return (
//       <MessageCardProvider>
//         <div style={{
//           height: '100vh',
//           margin: 0,
//           padding: 0,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}>
          
//           <SettingsModal 
//               maxTokens={maxTokens}
//               onChangeMaxTokens={setMaxTokens}
//               temperature={temperature}
//               onChangeTemperature={setTemperature}
//               breadth={breadth}
//               onChangeBreadth={setBreadth}
//               open={settingsOpen}
//               onClose={handleCloseSettings}
//               promptStyle={promptStyle}
//               onChangePromptStyle={setPromptStyle}
//           />
  
//           <div style={{
//             display: 'flex',
//             flexDirection: 'column',
//             flex: 1,
//             alignItems: 'center',
//             width: '80%', // Use a percentage or max-width for responsiveness
//           }}>
//             <div style={{
//               position: 'relative',
//               display: 'flex',
//               flexDirection: 'column',
//               height: '100%',
//               width: '100%',
//               boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)', // soft shadow for a card-like effect
//               borderRadius: '10px', // rounded corners
//               overflow: 'hidden', // keeps child contents (like the background image) inside
//             }}>
  
//               <Icon 
//                   bordered 
//                   color='grey' 
//                   name='settings' 
//                   size='big' 
//                   onClick={handleOpenSettings} 
//                   style={{
//                     position: 'absolute',
//                     right: '1em',
//                     top: '1em',
//                     zIndex: 1000,
//                   }}
//               />
  
//               <div style={{
//                 backgroundImage: `url('/images/BlackedOut.png')`,
//                 backgroundSize: 'cover',
//                 position: 'absolute',
//                 width: '100%',
//                 height: '100%',
//                 opacity: '0.2',
//               }}></div>
  
//               <div style={{
//                 flexGrow: 1,
//                 overflowY: 'auto',
//                 position: 'relative',
//                 padding: '1em', // spacing around messages
//               }}>
//                 <InitialMessage author={author} />
//                 {messages.map((msg) => (
//                   <Message 
//                     key={msg.id} 
//                     msg={msg} 
//                     query={msg.query} 
//                     promptStyleString={msg.promptStyleString} 
//                     handleMessageUpdate={handleMessageUpdate} 
//                   />
//                 ))}
//               </div>
  
//               <div style={{ padding: '2em' }}>
//                 <ChatInput 
//                   userMessage={userMessage} 
//                   setUserMessage={setUserMessage} 
//                   handleSubmit={handleSubmit} 
//                 />
//               </div>
  
//             </div>
//           </div>
  
//         </div>
//       </MessageCardProvider>
//     );
//   }
  