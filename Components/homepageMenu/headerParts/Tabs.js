import React, { useState, useEffect } from 'react';
import { Menu } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { useSwipeable } from 'react-swipeable';
import styled from 'styled-components';

const Tabs = () => {
    const router = useRouter();
    const [activeItem, setActiveItem] = useState('');
    const [visualActiveItem, setVisualActiveItem] = useState('');

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

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            switch(activeItem) {
                case 'Chat':
                    router.push('/semantic-library');
                    setActiveItem('Read');
                    setVisualActiveItem('Read');
                    break;
                case 'Read':
                    router.push('/timeless-media');
                    setActiveItem('Share');
                    setVisualActiveItem('Share');
                    break;
            }
        },
        onSwipedRight: () => {
            switch(activeItem) {
                case 'Share':
                    router.push('/semantic-library');
                    setActiveItem('Read');
                    setVisualActiveItem('Read');
                    break;
                case 'Read':
                    router.push('/the-greats');
                    setActiveItem('Chat');
                    setVisualActiveItem('Chat');
                    break;
            }
        }
    });

    const Container = styled.div`
        width: 75%;
        margin: 0 auto;
        /* other styles */

        @media (min-width: 768px) {
            width: 60%;
        }

        @media (min-width: 1024px) {
            width: 50%;
        }
    `;

    return (
        <Container>
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
        </Container>
    );        
};

export default Tabs;
