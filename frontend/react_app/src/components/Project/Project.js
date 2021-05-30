import React from 'react';

import 'font-awesome/css/font-awesome.min.css';
import classes from './Project.module.css';

const project = (props) => {
    let featuredImage = null;
    if (props.image) {
        featuredImage = <img
            style={{width: '100%'}}
            className={classes.Image}
            src={props.image.image}
            alt='Go to the web'
        />;
    }

    let classActive = [classes.ProjectCard];
    if (!props.active) {
        classActive.push(classes.Faded);
    }

    return (
        <div className={classActive.join(" ")}>
            <a target="_blank" rel="noopener noreferrer" href={props.link}>
                {featuredImage}
                <div className={classes.Container}>
                    <h4><b>{props.name}</b></h4>
                    <p>{props.summary}</p>
                </div>
            </a>
        </div>
    
    );
};

export default project;
