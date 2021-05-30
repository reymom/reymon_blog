import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems} onClick={props.clicked}>
        <NavigationItem link="/blog">BLOG</NavigationItem>
        <NavigationItem link="/projects" exact>PROJECTS</NavigationItem>
        <NavigationItem link="/about-me">ABOUT ME</NavigationItem>
    </ul>
);

export default navigationItems;
