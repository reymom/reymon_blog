import React from 'react';

import 'font-awesome/css/font-awesome.min.css';
import classes from './Post.module.css';

const post = (props) => {
    let featuredImage = null;
    if (props.image) {
        featuredImage = <img
            className={classes.FeaturedImage}
            src={props.image.image}
            alt={props.image.name}
        />;
    }

    let rating =
        <>
            <span className={["fa fa-star", classes.Fa, classes.FaChecked].join(' ')}></span>
            <span className={["fa fa-star", classes.Fa, classes.FaChecked].join(' ')}></span>
            <span className={["fa fa-star", classes.Fa, classes.FaChecked].join(' ')}></span>
            <span className={["fa fa-star", classes.Fa, classes.FaChecked].join(' ')}></span>
            <span className={["fa fa-star", classes.Fa, classes.FaChecked].join(' ')}></span>
        </>

    return (
        <article className={classes.Post}>
            { featuredImage}
            <h1
                className={classes.Title}
                onClick={props.clicked}>
                {props.title}
            </h1>
            <div className={classes.Info}>
                <div>{props.datePublished}</div>
                <div><span style={{ color: '#91bdcf' }}>{props.categories}</span></div>
                <div>{rating}</div>
            </div>
            <div className={classes.Intro}>{props.introduction}</div>
            <button
                className={classes.ReadMoreButton}
                onClick={props.clicked}>
                READ MORE
            </button>
        </article>
    );
};

export default post;
