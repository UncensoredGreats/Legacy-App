import React, { useState, useEffect } from 'react';
import { Button, Icon, Modal, Grid } from 'semantic-ui-react';
import AuthModal, { getAuthState } from '../../../app/authModal';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import { useSwipeable } from 'react-swipeable';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const HamburgerMenu = () => {
    const router = useRouter();
    const [activeItem, setActiveItem] = useState(router.pathname);
    const [modalOpen, setModalOpen] = useState(false);
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

  const handleItemClick = (name) => {
    setActiveItem(name);
    switch(name) {
      case 'The Greats':
        router.push('/the-greats');
        break;
      case 'Timeless Media':
        router.push('/timeless-media');
        break;
      case 'Semantic Library':
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

return (
  <Grid centered style={{ margin: 0, padding: 0 }}>
    <Grid.Column mobile={16} tablet={16} computer={13} style={{ margin: 0, padding: 0 }}>
      <>
        <Icon
          name="angle left"
          className="icon"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            position: 'fixed', 
            top: '-8px',
            left: '-14px',
            zIndex: 1001, 
            fontSize: '43px',
            color: 'black',
            borderRadius: '50%',   
            width: '50px',   
            height: '50px',        
            display: 'flex',         
            alignItems: 'center',    
            justifyContent: 'center',
            padding: '10px'  
          }}
        />
        <Icon
          name="user"
          className="icon"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ 
            position: 'absolute', 
            top: '-5px', 
            right: '30px', 
            zIndex: 1001, 
            fontSize: '23px',
            color: 'white',
            // backgroundImage: 'linear-gradient(45deg, #d08770, #a3be8c, #20b2aa, #4682b4, #483d8b, #7f00ff)',
            backgroundImage: 'linear-gradient(45deg, #a05c5c, #7f8f7f, #1a6868, #2d5c8c, #382f70, #5e007f)',
            // backgroundImage: 'linear-gradient(45deg, #d0d0d0, #a3a3a3, #707070, #404040, #202020, #000000)',
            // backgroundColor:  'white',
            // backgroundColor:  '#5C8CA3',
            // backgroundColor: '#66D5BA',
            // backgroundColor: '#00B290',
            borderRadius: '50%',   
            width: '50px',   
            height: '50px',        
            display: 'flex',         
            alignItems: 'center',    
            justifyContent: 'center',
            padding: '10px'           
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
            icon="book"
            content="Semantic Library"
            onClick={() => handleItemClick('Semantic Library')}
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

        {/* <Modal 
          open={modalOpen} 
          onClose={() => setModalOpen(false)}
          size='tiny'
          header='Authentication'
        >
          <div style={{padding: '20px'}}>
            <AuthModal />
          </div>
        </Modal> */}
        <Modal 
          open={modalOpen} 
          onClose={() => setModalOpen(false)}
          size='tiny'
        >
          <Modal.Header>Please Sign In</Modal.Header>
          <Modal.Content>
            <div style={{padding: '20px'}}>
              <AuthModal />
            </div>
          </Modal.Content>
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
    </Grid.Column>
  </Grid>
  );
};

export default HamburgerMenu;