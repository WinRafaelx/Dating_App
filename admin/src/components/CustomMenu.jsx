import * as React from 'react';
import { Menu, MenuItemLink, usePermissions } from 'react-admin';
import ListIcon from '@mui/icons-material/List';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';

const CustomMenu = () => {
    const { permissions } = usePermissions();

    return (
        <Menu>
            <MenuItemLink
                to="/userAuth"
                primaryText="Users"
                leftIcon={<PeopleIcon />}
            />
            <MenuItemLink
                to="/preferences"
                primaryText="Preferences"
                leftIcon={<SettingsIcon />}
            />
            {/* Add more menu items as needed */}
        </Menu>
    );
};

export default CustomMenu;
