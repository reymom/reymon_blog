import React from 'react';

import 'font-awesome/css/font-awesome.min.css';
import classes from './Icons.module.css';

const icons = (props) => (
    <ul className={classes.Icons}>
        <a href="https://github.com/reymom" 
           className={["fa fa-github", classes.fa, classes.fa_github].join(' ')}> </a>
        <a href="https://twitch.com/reymom7351"
           className={["fa fa-twitch", classes.fa, classes.fa_twitch].join(' ')}> </a>
        <a href="https://www.linkedin.com/in/ramon-marc-garcia-seuma/"
           className={["fa fa-linkedin", classes.fa, classes.fa_linkedin].join(' ')}> </a>
        <a href="https://twitter.com/Reymon56180985"
           className={["fa fa-twitter", classes.fa, classes.fa_twitter].join(' ')}> </a>
    </ul>
);

export default icons;
