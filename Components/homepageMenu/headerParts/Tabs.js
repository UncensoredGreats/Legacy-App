import React, { useState, useEffect } from 'react';
import { Menu } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { useSwipeable } from 'react-swipeable';

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

    // // OG No Color
    // return (
    //     <div style={{flex: 2, display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '0px', borderRadius: '25px', border: '1px solid #ddd', background: 'white', position: 'relative'}}>
    //         <div style={{position: 'absolute', bottom: '10px', height: '2px', width: '33%', background: '#333', borderRadius: '0 0 10px 10px', transition: '0.3s', left: visualActiveItem === 'Chat' ? '10px' : visualActiveItem === 'Read' ? '33%' : '66%'}}></div>
    //         <Menu.Item
    //             name='Chat'
    //             active={activeItem === 'Chat'}
    //             onClick={handleItemClick}
    //             style={{ fontSize: '20px', flex: 1, textAlign: 'center', padding: '10px', borderRadius: '10px 10px 0 0' }}
    //         />
    //         <Menu.Item
    //             name='Read'
    //             active={activeItem === 'Read'}
    //             onClick={handleItemClick}
    //             style={{ fontSize: '20px', flex: 1, textAlign: 'center', padding: '10px', borderRadius: '10px 10px 0 0' }}
    //         />
    //         <Menu.Item
    //             name='Share'
    //             active={activeItem === 'Share'}
    //             onClick={handleItemClick}
    //             style={{ fontSize: '20px', flex: 1, textAlign: 'center', padding: '10px', borderRadius: '10px 10px 0 0' }}
    //         />
    //     </div>
    // );





                // OG
            // backgroundImage: 'linear-gradient(45deg, #7fff00, #00ff7f, #007fff, #0000ff, #7f00ff, #800080)',

            // backgroundImage: 'linear-gradient(45deg, #5d6cb2, #6c5b7b, #26a69a, #4ecca3, #ffca28, #ff7043)',

            // backgroundImage: 'linear-gradient(45deg, #5b5b5b, #6c5b7b, #2196f3, #4dd0e1, #ffc107, #ff6f69)',

            // backgroundImage: 'linear-gradient(45deg, #5a5a5a, #6c5b7b, #2196f3, #29b6f6, #ffc107, #ff8a65)',

            // backgroundImage: 'linear-gradient(45deg, #9370db, #483d8b, #4682b4, #20b2aa, #98fb98, #f0e68c)',
            // backgroundImage: 'linear-gradient(45deg, #8a2be2, #4b0082, #4682b4, #20b2aa, #98fb98, #f0e68c)',
            // backgroundImage: 'linear-gradient(45deg, #9370db, #483d8b, #5e81ac, #8fbcbb, #a3be8c, #d08770)',



            // backgroundImage: 'linear-gradient(45deg, #9370db, #483d8b, #81a1c1, #8fbcbb, #a3be8c, #ebcb8b)',
            // backgroundImage: 'linear-gradient(45deg, #9370db, #483d8b, #81a1c1, #8fbcbb, #a3be8c, #d08770)',

            // backgroundImage: 'linear-gradient(45deg, #5d6cb2, #7c4dff, #1e88e5, #29b6f6, #ffca28, #ff9e80)',
            // backgroundImage: 'linear-gradient(45deg, #5a5a5a, #7e57c2, #1976d2, #29b6f6, #ffc107, #ff9e80)',
            // backgroundImage: 'linear-gradient(45deg, #5a5a5a, #7c4dff, #1e88e5, #29b6f6, #ffca28, #ffab91)',
            // backgroundImage: 'linear-gradient(45deg, #5b5b5b, #7c4dff, #1e88e5, #29b6f6, #ffe082, #ff6f69)',


            // Professional/Clean: Beautiful and simple
            // backgroundImage: 'linear-gradient(45deg, #e0f7fa, #b2ebf2, #80deea, #4dd0e1, #26c6da, #00bcd4)',

            // Warm/Inviting: Too orange, a bit overbearing.
            // backgroundImage: 'linear-gradient(45deg, #fff8e1, #ffecb3, #ffe082, #ffd54f, #ffca28, #ffc107)',

            // Exciting/Energetic: Red is the wrong choice of color for this site.
            // backgroundImage: 'linear-gradient(45deg, #ff8a80, #ff5252, #ff1744, #d32f2f, #c62828, #b71c1c)',

            // Cool/Calm: Not subtle enough for all blue.
            // backgroundImage: 'linear-gradient(45deg, #e1f5fe, #b3e5fc, #81d4fa, #29b6f6, #03a9f4, #0288d1)',

            // Fun/Creative
            // backgroundImage: 'linear-gradient(45deg, #f48fb1, #f06292, #ec407a, #e91e63, #d81b60, #c2185b)',



    return (
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
            // boxShadow: '0 0 3px rgba(0, 0, 0, .1), 0 0 6px rgba(0, 0, 0, .1), 0 0 9px rgba(0, 0, 0, .1), 0 0 12px rgba(0, 0, 0, .1), 0 0 15px rgba(0, 0, 0, .1)',
            boxShadow: '0 0 3px rgba(255, 255, 255, .1), 0 0 6px rgba(255, 255, 255, .1), 0 0 9px rgba(255, 255, 255, .1), 0 0 12px rgba(255, 255, 255, .1), 0 0 15px rgba(255, 255, 255, .1)',
            backgroundImage: 'linear-gradient(45deg, #7f00ff, #483d8b, #4682b4, #20b2aa, #a3be8c, #d08770)',
        }}>    
            <div style={{
                position: 'absolute',
                bottom: '10px',
                height: '2px',
                width: '33%',
                background: '#333',
                borderRadius: '0 0 10px 10px',
                transition: '0.3s',
                left: visualActiveItem === 'Chat' ? '10px' : visualActiveItem === 'Read' ? '33%' : '66%'
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
    );        
};

export default Tabs;
