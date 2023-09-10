import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';

const ProfileIcon = ({ isAuthenticated, handleLoginClick }) => {
    return (
        <div style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Menu.Menu style={{borderRadius: '50%', border: '1px solid #ddd', padding: '20px'}}>
                <Menu.Item
                    name='profile'
                    onClick={handleLoginClick}
                    style={{ fontSize: '18px' }}
                >
                    <Icon name={isAuthenticated ? 'sign-out' : 'sign-in'} size='large' />
                </Menu.Item>
            </Menu.Menu>
        </div>
    );
};

export default ProfileIcon;
