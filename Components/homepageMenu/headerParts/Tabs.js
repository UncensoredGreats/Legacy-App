import React, { useState, useEffect } from 'react';
import { Menu } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { useSwipeable } from 'react-swipeable';
import styled from 'styled-components';

const Container = styled.div`
  width: 75%;
  margin: 0 auto;
  @media (min-width: 768px) { width: 60%; }
  @media (min-width: 1024px) { width: 50%; }
`;

const InnerContainer = styled.div`
  flex: 2;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0;
  border-radius: 25px;
  border: 1px solid #ddd;
  background: white;
  position: relative;
  box-shadow: 0 0 15px rgba(0, 0, 0, .1);
  background-image: linear-gradient(45deg, #7f00ff, #483d8b, #4682b4, #20b2aa, #a3be8c, #d08770);
`;

const MenuItem = styled(Menu.Item)`
  font-size: 28px;
  font-weight: bold;
  font-family: Arial;
  color: white;
  flex: 1;
  text-align: center;
  padding: 10px;
  border-radius: 10px 10px 0 0;
`;

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

    return (
        <Container>
          <InnerContainer {...handlers}>
            <div style={{ /* your dynamic styles for div here */ }}></div>
            <MenuItem name='Chat' active={activeItem === 'Chat'} onClick={handleItemClick} />
            <MenuItem name='Read' active={activeItem === 'Read'} onClick={handleItemClick} />
            <MenuItem name='Share' active={activeItem === 'Share'} onClick={handleItemClick} />
          </InnerContainer>
        </Container>
      );
    };    

export default Tabs;
