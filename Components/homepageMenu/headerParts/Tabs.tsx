import React, { useState, useEffect } from 'react';
import { Menu } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const Tabs = () => {
    const router = useRouter();
    const [activeItem, setActiveItem] = useState('');
    const [visualActiveItem, setVisualActiveItem] = useState('');
    const [containerWidth, setContainerWidth] = useState('75%');

    useEffect(() => {
        const getActiveItem = () => {
            switch (router.pathname) {
                case '/the-greats':
                    return 'Chat';
                case '/timeless-media':
                    return 'Share';
                case '/semantic-library':
                default:
                    return 'Read';
            }
        };

        const active = getActiveItem();
        setActiveItem(active);
        setVisualActiveItem(active);
    }, [router.pathname]);

    const handleItemClick = (e, { name }) => {
        setActiveItem(name);
        setVisualActiveItem(name);

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

    const updateWidth = () => {
      const winWidth = window.innerWidth;
  
      if (winWidth >= 1024) {
        setContainerWidth('50%');
      } else if (winWidth >= 768) {
        setContainerWidth('60%');
      } else {
        setContainerWidth('75%');
      }
    };

    useEffect(() => {
      updateWidth();
      window.addEventListener('resize', updateWidth);
  
      return () => {
        window.removeEventListener('resize', updateWidth);
      };
    }, []);

    return (
      <div style={{ width: containerWidth, margin: '0 auto' }}>
        <div style={{
            flex: 2,
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '0px',
            borderRadius: '25px',
            border: '1px solid #ddd',
            background: 'white',
            position: 'relative',
            boxShadow: '0 0 3px rgba(0, 0, 0, .1), 0 0 6px rgba(0, 0, 0, .1), 0 0 9px rgba(0, 0, 0, .1), 0 0 12px rgba(0, 0, 0, .1), 0 0 15px rgba(0, 0, 0, .1)',
            // boxShadow: '0 0 3px rgba(255, 255, 255, .1), 0 0 6px rgba(255, 255, 255, .1), 0 0 9px rgba(255, 255, 255, .1), 0 0 12px rgba(255, 255, 255, .1), 0 0 15px rgba(255, 255, 255, .1)',
            backgroundImage: 'linear-gradient(45deg, #7f00ff, #483d8b, #4682b4, #20b2aa, #a3be8c, #d08770)',
        }}>    
            <div style={{
                position: 'absolute',
                bottom: '-7px',
                height: '7px',
                width: '33%',
                border: '1px solid white',
                background: 'grey',
                borderRadius: '0 0 10px 10px',
                transition: '0.3s',
                left: visualActiveItem === 'Chat' ? '15px' : 
                visualActiveItem === 'Read' ? '34%' : '64.5%'
            }}></div>
            <Menu.Item
                name='Chat'
                active={activeItem === 'Chat'}
                onClick={handleItemClick}
                style={{
                    fontSize: '28px',
                    fontWeight: 'bold',
                    fontFamily: 'Arial',
                    color: 'white',
                    flex: 1,
                    textAlign: 'center',
                    padding: '10px',
                    borderRadius: '10px 10px 0 0'
                }}
            />
            <Menu.Item
                name='Read'
                active={activeItem === 'Read'}
                onClick={handleItemClick}
                style={{
                    fontSize: '28px',
                    fontWeight: 'bold',
                    fontFamily: 'Arial',
                    color: 'white',
                    flex: 1,
                    textAlign: 'center',
                    padding: '10px',
                    borderRadius: '10px 10px 0 0'
                }}
            />
            <Menu.Item
                name='Share'
                active={activeItem === 'Share'}
                onClick={handleItemClick}
                style={{
                    fontSize: '28px',
                    fontWeight: 'bold',
                    fontFamily: 'Arial',
                    color: 'white',
                    flex: 1,
                    textAlign: 'center',
                    padding: '10px',
                    borderRadius: '10px 10px 0 0'
                }}
            />
        </div>
       </div> 
    );        
};

export default Tabs;

