import * as React from 'react';
import { Menu, MenuItemLink, usePermissions } from 'react-admin';
import PeopleIcon from '@mui/icons-material/People';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FlagIcon from '@mui/icons-material/Flag';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import JoinInnerIcon from '@mui/icons-material/JoinInner';
import ForumIcon from '@mui/icons-material/Forum';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import BlockIcon from '@mui/icons-material/Block';

const CustomMenu = () => {
    const { permissions } = usePermissions();

    return (
        <Menu>
            <MenuItemLink
                to="/userAuth"
                primaryText="Auth"
                leftIcon={<VpnKeyIcon />}
            />
            <MenuItemLink
                to="/userAuth"
                primaryText="Infoes"
                leftIcon={<PeopleIcon />}
            />
            <MenuItemLink
                to="/preferences"
                primaryText="Preferences"
                leftIcon={<FavoriteIcon />}
            />
            <MenuItemLink
                to="/preferences"
                primaryText="Likes"
                leftIcon={<ThumbUpIcon />}
            />
            <MenuItemLink
                to="/userAuth"
                primaryText="Matches"
                leftIcon={<JoinInnerIcon />}
            />
            <MenuItemLink
                to="/userAuth"
                primaryText="Messages"
                leftIcon={<ForumIcon />}
            />
            <MenuItemLink
                to="/userAuth"
                primaryText="Chat Status"
                leftIcon={<PauseCircleFilledIcon />}
            />
            <MenuItemLink
                to="/userAuth"
                primaryText="Blocks"
                leftIcon={<BlockIcon />}
            />
            <MenuItemLink
                to="/preferences"
                primaryText="Reports"
                leftIcon={<FlagIcon />}
            />

        </Menu>
    );
};

export default CustomMenu;
