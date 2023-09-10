// import { useRouter } from 'next/router';
// import React, { useState, useEffect } from 'react';
// import { Menu } from 'semantic-ui-react';

// const Tabs = () => {
//     const router = useRouter();
//     const [activeItem, setActiveItem] = useState('');

//     useEffect(() => {
//         const getActiveItem = () => {
//             switch (router.pathname) {
//                 case '/the-greats':
//                     return 'Chat';
//                 case '/timeless-media':
//                     return 'Share';
//                 case '/semantic-library':
//                 default:
//                     return 'Read';
//             }
//         };

//         setActiveItem(getActiveItem());
//     }, [router.pathname]);

//     const handleItemClick = (e, { name }) => {
//         setActiveItem(name);

//         switch(name) {
//             case 'Chat':
//                 router.push('/the-greats');
//                 break;
//             case 'Share':
//                 router.push('/timeless-media');
//                 break;
//             case 'Read':
//                 router.push('/semantic-library');
//                 break;
//             case 'About':
//                 router.push('/about');
//                 break;
//         }
//     };

//     return (
//         <Menu pointing secondary>
//             <Menu.Item
//                 name='Chat'
//                 active={activeItem === 'Chat'}
//                 onClick={handleItemClick}
//             />
//             <Menu.Item
//                 name='Read'
//                 active={activeItem === 'Read'}
//                 onClick={handleItemClick}
//             />
//             <Menu.Item
//                 name='Share'
//                 active={activeItem === 'Share'}
//                 onClick={handleItemClick}
//             />
//         </Menu>
//     );
// };

// export default Tabs;








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

    return (
        <div style={{flex: 2, display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '0px', borderRadius: '25px', border: '1px solid #ddd', background: 'white', position: 'relative'}}>
            <div style={{position: 'absolute', bottom: '10px', height: '2px', width: '33%', background: '#333', borderRadius: '0 0 10px 10px', transition: '0.3s', left: visualActiveItem === 'Chat' ? '10px' : visualActiveItem === 'Read' ? '33%' : '66%'}}></div>
            <Menu.Item
                name='Chat'
                active={activeItem === 'Chat'}
                onClick={handleItemClick}
                style={{ fontSize: '20px', flex: 1, textAlign: 'center', padding: '10px', borderRadius: '10px 10px 0 0' }}
            />
            <Menu.Item
                name='Read'
                active={activeItem === 'Read'}
                onClick={handleItemClick}
                style={{ fontSize: '20px', flex: 1, textAlign: 'center', padding: '10px', borderRadius: '10px 10px 0 0' }}
            />
            <Menu.Item
                name='Share'
                active={activeItem === 'Share'}
                onClick={handleItemClick}
                style={{ fontSize: '20px', flex: 1, textAlign: 'center', padding: '10px', borderRadius: '10px 10px 0 0' }}
            />
        </div>
    );
};

export default Tabs;
