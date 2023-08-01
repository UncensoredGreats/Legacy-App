// // OG
// import { useRouter } from 'next/router';
// import React, { useState, useEffect } from 'react';
// import { Button, Dropdown, Menu, Input, Modal, Grid, Icon } from 'semantic-ui-react';
// import AuthModal, { getAuthState } from '../../app/authModal';

// import { createClient } from '@supabase/supabase-js'

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
//       case 'About':
//         router.push('/about');
//         break;
//     }
//   };

  
//   return (
//     <Grid centered style={{ margin: 0, padding: 0 }}>
//       <Grid.Column mobile={16} tablet={16} computer={13} style={{ margin: 0, padding: 0 }}>
//         <div style={headerStyle}>
//           <Menu style={headerbarStyle}>
//              <Dropdown item text='Discover' className="hoverEffect">
//                <Dropdown.Menu className="dropdownMenuStyle">
//                  <Dropdown.Item
//                   text='The Greats'
//                   active={activeItem === '/the-greats'}
//                   onClick={() => handleItemClick('The Greats')}
//                 />
//                 <Dropdown.Item
//                   text='Timeless Media'
//                   active={activeItem === '/timeless-media'}
//                   onClick={() => handleItemClick('Timeless Media')}
//                 />
//                 <Dropdown.Item
//                   text='About'
//                   active={activeItem === '/about'}
//                   onClick={() => handleItemClick('About')}
//                 />
//               </Dropdown.Menu>
//             </Dropdown>
//             <Menu.Menu position='right'>
//               {isAuthenticated && (
//                   <Dropdown item text='Your Library'>
//                     <Dropdown.Menu>
//                       <Dropdown.Item
//                         text='Wisdom Tree'
//                         onClick={() => handleUserMenuClick('Wisdom Tree')}
//                       />
//                       <Dropdown.Item
//                         text='Bookmarked'
//                         onClick={() => handleUserMenuClick('Bookmarked')}
//                       />
//                     </Dropdown.Menu>
//                   </Dropdown>
//                 )}
//               <Menu.Item
//                 name='sign-out'
//                 onClick={handleLoginClick}
//               >
//                 <Icon name={isAuthenticated ? 'sign-out' : 'sign-in'} />
//                 {isAuthenticated ? 'Sign Out' : 'Sign In'}
//               </Menu.Item>
//             </Menu.Menu>
//           </Menu>
//           <Modal 
//             open={modalOpen} 
//             onClose={() => setModalOpen(false)}
//             size='tiny'
//             header='Authentication'
//           >
//             <div style={{padding: '20px'}}>
//               <AuthModal />
//             </div>
//           </Modal>
//         </div>
//       </Grid.Column>
//     </Grid>
//   );  
// }

// export default HeaderProp;








import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Menu, Input, Modal, Grid, Icon} from 'semantic-ui-react';
import AuthModal, { getAuthState } from '../../app/authModal';
import { createClient } from '@supabase/supabase-js'
import { useSwipeable } from 'react-swipeable';


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
      case 'The Greats':
        router.push('/the-greats');
        break;
      case 'Timeless Media':
        router.push('/timeless-media');
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
  onSwipedRight: () => setMenuOpen(true),
  onSwipedLeft: () => setMenuOpen(false),
  // preventDefaultTouchmoveEvent: true,
  trackMouse: true
});


const menuStyle: React.CSSProperties = {
  position: 'fixed',
  top: '0',
  right: menuOpen ? '-250px' : '0',
  width: '250px',
  height: '100%',
  background: '#1E2B20',
  color: '#fff',
  transition: 'right 0.3s',
  padding: '20px',
  zIndex: 1000,
};

const buttonStyle: React.CSSProperties = {
  marginBottom: '15px',
  backgroundColor: '#FFF8E1', 
  color: '#333'
};

return (
  <>
    <Icon
      name="bars"
      className="icon"
      onClick={() => setMenuOpen(!menuOpen)}
      style={{ 
        position: 'fixed', 
        top: '15px', 
        left: '15px', 
        zIndex: 1001, 
        fontSize: '20px', // Button Size
        color: 'black'
      }}
    />

    <div style={menuStyle} className={"menu"}>
      <Button 
        fluid 
        icon="users" 
        content="The Greats" 
        onClick={() => handleItemClick('The Greats')} 
        style={buttonStyle}
      />
      <Button 
        fluid 
        icon="eye" 
        content="Timeless Media" 
        onClick={() => handleItemClick('Timeless Media')} 
        style={buttonStyle}
      />
      <Button 
        fluid 
        icon="info circle" 
        content="About" 
        onClick={() => handleItemClick('About')} 
        style={buttonStyle}
      />

      <div style={{ marginTop: '15px', borderTop: '1px solid #fff', paddingTop: '15px'}}>
        {isAuthenticated && (
          <>
            <Button 
              fluid 
              icon="tree" 
              content="Wisdom Tree" 
              onClick={() => handleUserMenuClick('Wisdom Tree')} 
              style={buttonStyle}
            />
            <Button 
              fluid 
              icon="bookmark" 
              content="Bookmarked" 
              onClick={() => handleUserMenuClick('Bookmarked')} 
              style={buttonStyle}
            />
          </>
        )}
      </div>
      
      <div style={{ position: 'absolute', bottom: '20px', width: '85%'}}>
        <Button 
          fluid 
          icon={isAuthenticated ? 'sign-out' : 'sign-in'} 
          content={isAuthenticated ? 'Sign Out' : 'Sign In'}
          onClick={handleLoginClick} 
          style={buttonStyle}
        />
      </div>
    </div>

    {/* Existing Auth Modal */}
    <Modal 
      open={modalOpen} 
      onClose={() => setModalOpen(false)}
      size='tiny'
      header='Authentication'
    >
      <div style={{padding: '20px'}}>
        <AuthModal />
      </div>
    </Modal>
    <div {...handlers} style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -2
      }}></div>
  </>
);
};
export default HeaderProp;
