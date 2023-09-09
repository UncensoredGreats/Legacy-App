// import { useRouter } from 'next/router';
// import React, { useState, useEffect } from 'react';
// import { Button, Grid, Modal, Icon} from 'semantic-ui-react';
// import AuthModal, { getAuthState } from '../../app/authModal';
// import { createClient } from '@supabase/supabase-js'
// import { useSwipeable } from 'react-swipeable';

// import { Menu } from 'semantic-ui-react';
// import styles from '../../styles/header.module.css';


// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// )

// const HeaderProp = () => {
//   const router = useRouter();
//   const [activeItem, setActiveItem] = useState(router.pathname);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [windowWidth, setWindowWidth] = useState(0);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     supabase.auth.onAuthStateChange((_event, session) => {
//       setIsAuthenticated(session ? true : false);
//     });
//     setIsAuthenticated(getAuthState() ? true : false);
//   }, []);

//   useEffect(() => {
//     supabase.auth.onAuthStateChange((event, session) => {
//       if (event === 'SIGNED_IN') {
//         setModalOpen(false);
//         setIsAuthenticated(true);
//       } else if (event === 'SIGNED_OUT') {
//         setIsAuthenticated(false);
//       }
//     });
//   }, []);  

//   const handleLoginClick = () => {
//     if (isAuthenticated) {
//       supabase.auth.signOut().then(() => {
//         setIsAuthenticated(false);
//         setModalOpen(false);
//       });
//     } else {
//       setModalOpen(true);
//     }
//   };

//   const handleUserMenuClick = (name) => {
//     switch(name) {
//       case 'Wisdom Tree':
//         router.push('/wisdom-tree');
//         break;
//       case 'Bookmarked':
//         router.push('/bookmarked');
//         break;
//     }
//   };


//   const headerStyle = {
//     padding: '20px 20px', 
//     height: 'auto',
//   };
  
//   const headerbarStyle = {
//     backgroundColor: 'linear-gradient(120deg, #f6f9fc, #eef5f8) !important',
//   };

//   const handleItemClick = (name) => {
//     setActiveItem(name);
//     switch(name) {
//       case 'The Greats':
//         router.push('/the-greats');
//         break;
//       case 'Timeless Media':
//         router.push('/timeless-media');
//         break;
//       case 'Semantic Library':
//         router.push('/semantic-library');
//         break;
//       case 'About':
//         router.push('/about');
//         break;
//     }
//   };

// const [menuOpen, setMenuOpen] = useState(false);

// useEffect(() => {
//   const handleClickOutside = (e) => {
//     if (menuOpen && e.target.closest('.menu') === null && !e.target.classList.contains('icon')) {
//       setMenuOpen(false);
//     }
//   };
//   if (menuOpen) {
//     document.addEventListener('click', handleClickOutside);
//   }
//   return () => {
//     document.removeEventListener('click', handleClickOutside);
//   };
// }, [menuOpen]);

// const handlers = useSwipeable({
//   onSwipedRight: () => setMenuOpen(false),
//   onSwipedLeft: () => setMenuOpen(true),
//   trackMouse: true
// });


// const menuStyle: React.CSSProperties = {
//   position: 'fixed',
//   top: '0',
//   left: menuOpen ? '0px' : '-250px',
//   width: '250px',
//   height: '100%',
//   background: '#436B78',
//   color: '#fff',
//   transition: 'left 0.3s',
//   padding: '20px',
//   zIndex: 1000,
// };

// const buttonStyle: React.CSSProperties = {
//   marginBottom: '15px',
//   backgroundColor: '#FFF8E1', 
//   color: '#333'
// };

// return (
//   <Grid centered style={{ margin: 0, padding: 0 }}>
//     <Grid.Column mobile={16} tablet={16} computer={13} style={{ margin: 0, padding: 0 }}>
//       <>
//         <Icon
//           name="angle left"
//           className="icon"
//           onClick={() => setMenuOpen(!menuOpen)}
//           style={{
//             position: 'fixed', 
//             top: '-5px',
//             left: '-5px',
//             zIndex: 1001, 
//             fontSize: '43px',
//             color: '#5C8CA3',
//             borderRadius: '50%',   
//             width: '50px',   
//             height: '50px',        
//             display: 'flex',         
//             alignItems: 'center',    
//             justifyContent: 'center',
//             padding: '10px'  
//           }}
//         />
//         <Icon
//           name="bars"
//           className="icon"
//           onClick={() => setMenuOpen(!menuOpen)}
//           style={{ 
//             position: 'fixed', 
//             bottom: '100px', 
//             right: '30px', 
//             zIndex: 1001, 
//             fontSize: '23px',
//             color: 'black',
//             backgroundColor:  '#5C8CA3',
//             // backgroundColor: '#66D5BA',
//             // backgroundColor: '#00B290',
//             borderRadius: '50%',   
//             width: '50px',   
//             height: '50px',        
//             display: 'flex',         
//             alignItems: 'center',    
//             justifyContent: 'center',
//             padding: '10px'           
//           }}
//         />

//         <div style={menuStyle} className={"menu"}>
//           <Button 
//             fluid 
//             icon="users" 
//             content="The Greats" 
//             onClick={() => handleItemClick('The Greats')} 
//             style={buttonStyle}
//           />
//           <Button 
//             fluid 
//             icon="eye" 
//             content="Timeless Media" 
//             onClick={() => handleItemClick('Timeless Media')} 
//             style={buttonStyle}
//           />
//           <Button
//             fluid
//             icon="book"
//             content="Semantic Library"
//             onClick={() => handleItemClick('Semantic Library')}
//             style={buttonStyle}
//           />
//           <Button 
//             fluid 
//             icon="info circle" 
//             content="About" 
//             onClick={() => handleItemClick('About')} 
//             style={buttonStyle}
//           />

//           <div style={{ marginTop: '15px', borderTop: '1px solid #fff', paddingTop: '15px'}}>
//             {isAuthenticated && (
//               <>
//                 <Button 
//                   fluid 
//                   icon="tree" 
//                   content="Wisdom Tree" 
//                   onClick={() => handleUserMenuClick('Wisdom Tree')} 
//                   style={buttonStyle}
//                 />
//                 <Button 
//                   fluid 
//                   icon="bookmark" 
//                   content="Bookmarked" 
//                   onClick={() => handleUserMenuClick('Bookmarked')} 
//                   style={buttonStyle}
//                 />
//               </>
//             )}
//           </div>
          
//           <div style={{ position: 'absolute', bottom: '20px', width: '85%'}}>
//             <Button 
//               fluid 
//               icon={isAuthenticated ? 'sign-out' : 'sign-in'} 
//               content={isAuthenticated ? 'Sign Out' : 'Sign In'}
//               onClick={handleLoginClick} 
//               style={buttonStyle}
//             />
//           </div>
//         </div>

//         {/* Existing Auth Modal */}
        // <Modal 
        //   open={modalOpen} 
        //   onClose={() => setModalOpen(false)}
        //   size='tiny'
        //   header='Authentication'
        // >
        //   <div style={{padding: '20px'}}>
        //     <AuthModal />
        //   </div>
        // </Modal>
//         <div {...handlers} style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             zIndex: -2
//           }}></div>
//       </>
//     </Grid.Column>
//   </Grid>
//   );
// };
// export default HeaderProp;














import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Button, Grid, Modal, Icon} from 'semantic-ui-react';
import AuthModal, { getAuthState } from '../../app/authModal';
import { createClient } from '@supabase/supabase-js'
import { useSwipeable } from 'react-swipeable';

import { Menu } from 'semantic-ui-react';
import styles from '../../styles/header.module.css';


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const HeaderProp = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState(router.pathname);
  const [modalOpen, setModalOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(session ? true : false);
    });
    setIsAuthenticated(getAuthState() ? true : false);
  }, []);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setModalOpen(false);
        setIsAuthenticated(true);
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
      }
    });
  }, []);  

  const handleLoginClick = () => {
    if (isAuthenticated) {
      supabase.auth.signOut().then(() => {
        setIsAuthenticated(false);
        setModalOpen(false);
      });
    } else {
      setModalOpen(true);
    }
  };

  const handleUserMenuClick = (name) => {
    switch(name) {
      case 'Wisdom Tree':
        router.push('/wisdom-tree');
        break;
      case 'Bookmarked':
        router.push('/bookmarked');
        break;
    }
  };

  const headerStyle = {
    padding: '20px 20px', 
    height: 'auto',
  };
  
  const headerbarStyle = {
    backgroundColor: 'linear-gradient(120deg, #f6f9fc, #eef5f8) !important',
  };

  const handleItemClick = (name) => {
    setActiveItem(name);
    switch(name) {
      case 'Chat':
        router.push('/the-greats');
        break;
      case 'Share':
        router.push('/timeless-media');
        break;
      case 'Read':
        router.push('/semantic-library');
        break;
      case 'About':
        router.push('/about');
        break;
    }
  };

const [menuOpen, setMenuOpen] = useState(false);

useEffect(() => {
  const handleClickOutside = (e) => {
    if (menuOpen && e.target.closest('.menu') === null && !e.target.classList.contains('icon')) {
      setMenuOpen(false);
    }
  };
  if (menuOpen) {
    document.addEventListener('click', handleClickOutside);
  }
  return () => {
    document.removeEventListener('click', handleClickOutside);
  };
}, [menuOpen]);

const handlers = useSwipeable({
  onSwipedRight: () => setMenuOpen(false),
  onSwipedLeft: () => setMenuOpen(true),
  trackMouse: true
});


const menuStyle: React.CSSProperties = {
  position: 'fixed',
  top: '0',
  left: menuOpen ? '0px' : '-250px',
  width: '250px',
  height: '100%',
  background: '#436B78',
  color: '#fff',
  transition: 'left 0.3s',
  padding: '20px',
  zIndex: 1000,
};

const buttonStyle: React.CSSProperties = {
  marginBottom: '15px',
  backgroundColor: '#FFF8E1', 
  color: '#333'
};


// // // Plain Semantic UI Menu: 
//   return (
//     <Menu fixed='top' inverted>
//       <Menu.Item
//         name='chat'
//         onClick={() => handleItemClick('Chat')}
//       >
//         Chat
//       </Menu.Item>
//       <Menu.Item
//         name='read'
//         onClick={() => handleItemClick('Read')}
//       >
//         Read
//       </Menu.Item>
//       <Menu.Item
//         name='share'
//         onClick={() => handleItemClick('Share')}
//       >
//         Share
//       </Menu.Item>
//       <Menu.Menu position='right'>
//         <Menu.Item
//           name='profile'
//           onClick={handleLoginClick}
//         >
//           <Icon name={isAuthenticated ? 'sign-out' : 'sign-in'} />
//           {isAuthenticated ? 'Sign Out' : 'Sign In'}
//         </Menu.Item>
//       </Menu.Menu>
//       <Modal 
//           open={modalOpen} 
//           onClose={() => setModalOpen(false)}
//           size='tiny'
//           header='Authentication'
//         >
//           <div style={{padding: '20px'}}>
//             <AuthModal />
//           </div>
//         </Modal>
//     </Menu>
//   );
// };

// export default HeaderProp;



// // Basic separated version

// return (
//   <div style={{display: 'flex', justifyContent: 'space-between', padding: '10px'}}>
//     <div style={{flex: 1}}></div>
//     <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px', borderRadius: '25px', background: 'gray', flex: 2}}>
//       <Menu.Item
//         name='chat'
//         onClick={() => handleItemClick('Chat')}
//       >
//         Chat
//       </Menu.Item>
//       <Menu.Item
//         name='read'
//         onClick={() => handleItemClick('Read')}
//       >
//         Read
//       </Menu.Item>
//       <Menu.Item
//         name='share'
//         onClick={() => handleItemClick('Share')}
//       >
//         Share
//       </Menu.Item>
//     </div>
//     <div style={{borderRadius: '50%', background: 'gray', flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
//       <Menu.Menu>
//         <Menu.Item
//           name='profile'
//           onClick={handleLoginClick}
//         >
//           <Icon name={isAuthenticated ? 'sign-out' : 'sign-in'} />
//           {isAuthenticated ? 'Sign Out' : 'Sign In'}
//         </Menu.Item>
//       </Menu.Menu>
//     </div>
//     <Modal 
//       open={modalOpen} 
//       onClose={() => setModalOpen(false)}
//       size='tiny'
//       header='Authentication'
//     >
//       <div style={{padding: '20px'}}>
//         <AuthModal />
//       </div>
//     </Modal>
//   </div>
// );

// };

// export default HeaderProp;






  return (
    <div style={{display: 'flex', justifyContent: 'flex-end', paddingTop: '25px', paddingBottom: '10px' }}>
      <div style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        {/* left container content goes here, it's currently empty */}
      </div>
      <div style={{flex: 1, display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '10px', borderRadius: '25px', border: '1px solid #ddd'}}>
        <Menu.Item
          name='chat'
          onClick={() => handleItemClick('Chat')}
        >
          <Icon name='chat' />
          Chat
        </Menu.Item>
        <Menu.Item
          name='read'
          onClick={() => handleItemClick('Read')}
        >
          <Icon name='book' />
          Read
        </Menu.Item>
        <Menu.Item
          name='share'
          onClick={() => handleItemClick('Share')}
        >
          <Icon name='share' />
          Share
        </Menu.Item>
      </div>
      <div style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Menu.Menu style={{borderRadius: '50%', border: '1px solid #ddd', padding: '10px'}}>
          <Menu.Item
            name='profile'
            onClick={handleLoginClick}
          >
            <Icon name={isAuthenticated ? 'sign-out' : 'sign-in'} />
            {isAuthenticated ? 'Sign Out' : 'Sign In'}
          </Menu.Item>
        </Menu.Menu>
      </div>
      <Modal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)}
        size='tiny'
        header='Authentication'
      >
        <div style={{padding: '20px', border: '1px solid #ddd'}}>
          <AuthModal />
        </div>
      </Modal>
    </div>
  );
};

export default HeaderProp;