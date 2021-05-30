import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import classes from './Blog.module.css';
import Posts from './Posts/Posts';
import LoadedPost from './LoadedPost/LoadedPost';
import Projects from '../Projects/Projects';

class Blog extends Component {

    render () {
        return (
            <div className={classes.Blog}>
                <div className={classes.Content}>
                    <Route
                        path={'/'}
                        exact
                        component={Posts}
                    />
                    <Route
                        path={'/blog'}
                        exact
                        component={Posts}
                    />
                    <Route
                        path={this.props.match.url + '/categories/:category'}
                        exact
                        component={Posts}
                    />
                    <Route
                        path={this.props.match.url + '/posts/:id'}
                        exact
                        component={LoadedPost}
                    />
                    <Route
                        path={'/projects'}
                        exact
                        component={Projects}
                    />
                </div>
            </div>
        );
    }
};

export default Blog;
