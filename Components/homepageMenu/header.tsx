// Adding Profile Specific Pages:
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Menu, Input, Modal, Grid, Icon } from 'semantic-ui-react';
import AuthModal, { getAuthState } from '../../app/authModal';

import { createClient } from '@supabase/supabase-js'

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
      case 'Debates':
        router.push('/debates');
        break;
    }
  };

  
  return (
    <Grid centered style={{ margin: 0, padding: 0 }}>
      <Grid.Column mobile={16} tablet={16} computer={13} style={{ margin: 0, padding: 0 }}>
        <div style={headerStyle}>
          <Menu style={headerbarStyle}>
             <Dropdown item text='Discover' className="hoverEffect">
               <Dropdown.Menu className="dropdownMenuStyle">
                 <Dropdown.Item
                  text='The Greats'
                  active={activeItem === '/the-greats'}
                  onClick={() => handleItemClick('The Greats')}
                />
                <Dropdown.Item
                  text='Timeless Media'
                  active={activeItem === '/timeless-media'}
                  onClick={() => handleItemClick('Timeless Media')}
                />
                <Dropdown.Item
                  text='Debates'
                  active={activeItem === '/debates'}
                  onClick={() => handleItemClick('Debates')}
                />
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Menu position='right'>
              {isAuthenticated && (
                  <Dropdown item text='Your Library'>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        text='Wisdom Tree'
                        onClick={() => handleUserMenuClick('Wisdom Tree')}
                      />
                      <Dropdown.Item
                        text='Bookmarked'
                        onClick={() => handleUserMenuClick('Bookmarked')}
                      />
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              <Menu.Item
                name='sign-out'
                onClick={handleLoginClick}
              >
                <Icon name={isAuthenticated ? 'sign-out' : 'sign-in'} />
                {isAuthenticated ? 'Sign Out' : 'Sign In'}
              </Menu.Item>
            </Menu.Menu>
          </Menu>
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
        </div>
      </Grid.Column>
    </Grid>
  );  
}

export default HeaderProp;