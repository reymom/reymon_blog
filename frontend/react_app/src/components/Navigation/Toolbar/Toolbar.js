import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = ( props ) => (
    <header className={ classes.Header }>
        <div className={ classes.Toggle }>
            <DrawerToggle clicked={ props.drawerToggleClicked } />
            <div className={ classes.LogoContainer }>
                <Logo/>
            </div>
        </div>
        <div className={ classes.Navigation }>
            <nav className={ classes.DesktopOnly }>
                <NavigationItems />
            </nav>
        </div>
    </header>
);

export default toolbar;
