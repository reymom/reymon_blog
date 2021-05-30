import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-blog';

import classes from './Posts.module.css';
import * as actions from '../../../store/actions';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Post from '../../../components/Post/Post';

class Posts extends Component {
    state = {
        showDropdown: false,
    }

    componentDidMount() {
        this.props.onFetchPosts();
        let pathname = this.props.history.location.pathname;

        if (['/blog', '/'].includes(pathname)) {
            document.title = 'Reymon | Blog';
        } else if (pathname.includes('categories')) {
            let category = pathname.split('/').slice(-1)[0];
            document.title = 'Reymon | Blog - ' + category.charAt(0).toUpperCase() + category.slice(1);
        }
    }

    postSelectedHandler = (id) => {
        document.title = 'Blog | Post ' + id;
        this.props.history.push({ pathname: '/blog/posts/' + id });
    }

    categorySelectedHandler = (category) => {
        this.dropdownContentHandler();
        document.title = 'Reymon | Blog - ' + category.charAt(0).toUpperCase() + category.slice(1);
        this.props.history.push({ pathname: '/blog/categories/' + category });
    }

    categoryNameTranslator = (category) => {
        switch (category) {
            case 'datascience':
                category = 'data science';
                return category;
            case 'frontend':
                category = 'web';
                return category;
            default:
                return category;
        };
    }

    dropdownContentHandler = () => {
        this.setState(prevState => ({ showDropdown: !prevState.showDropdown}) );
    }

    render() {
        let posts = <Spinner />;
        if (!this.props.loading & this.props.posts.length > 0) {
            posts = this.props.posts.map(post => {
                if (post.published_date) {
                    let category = this.categoryNameTranslator(this.props.match.params.category);
                    if ((category && post.tags.includes(category)) || !category) {
                        let datePublished = post.published_date
                            .replace(/-/g, '/').replace('T', ', ').replace('Z', '');
                        return (
                            <Post
                                key={post.id}
                                image={post.featured_image}
                                datePublished={datePublished}
                                categories={post.tags.join(', ')}
                                title={post.title}
                                introduction={post.introduction}
                                clicked={() => this.postSelectedHandler(post.id)}
                            />
                        );
                    }
                    else {
                        return '';
                    }
                } else {
                    return '';
                }
            });
        }
        let DropdownClasses = [classes.DropdownContent]
        if (this.state.showDropdown) {
            DropdownClasses.push(classes.ShowDropdownContent)
        }
        return (
            <div>
                <div className={classes.Header}>
                    <div className={classes.CategoriesDropdown}>
                        <button 
                            className={classes.DropdownButton} 
                            onClick={this.dropdownContentHandler}>
                                Categories
                        </button>
                        <div className={DropdownClasses.join(" ")}>
                            <p onClick={() => this.categorySelectedHandler('maths')}>Physics and Maths</p>
                            <p href="#" onClick={() => this.categorySelectedHandler('blockchain')}>Blockchain</p>
                            <p href="#" onClick={() => this.categorySelectedHandler('datascience')}>Data science</p>
                            <p href="#" onClick={() => this.categorySelectedHandler('frontend')}>Front-end</p>
                            <p href="#" onClick={() => this.categorySelectedHandler('lifestyle')}>Lifestyle</p>
                        </div>
                    </div>
                </div>
                <section className={classes.Posts}>
                    {posts}
                </section>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        posts: state.blog.posts,
        loading: state.blog.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPosts: () => dispatch(actions.fetchPosts(null))
    };
};

export default connect(
    mapStateToProps, mapDispatchToProps
)(withErrorHandler(Posts, axios));
