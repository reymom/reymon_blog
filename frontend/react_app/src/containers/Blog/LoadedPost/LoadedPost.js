import React, { Component } from 'react';
import { connect } from 'react-redux';
import DOMPurify from 'dompurify';


import MathJax from 'react-mathjax2';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import classes from './LoadedPost.module.css';
import './LoadedPostJupyter.css';
import * as actions from '../../../store/actions';
import Spinner from '../../../components/UI/Spinner/Spinner';

class LoadedPost extends Component {

    componentDidMount() {
        if (this.props.posts.length < 1) {
            this.props.onFetchPosts(this.props.match.params.id);
        }

        document.title = 'Blog | Post ' + this.props.match.params.id;
    }

    parseInnerBoldLinkMath = (content) => {
        let contentBold = content.split(/(<b*>.*?<\/b>)/g);
        if (contentBold) {
            return contentBold.map((sliceContent, index) => {
                if (sliceContent.search('<b>') !== -1) {
                    let bCont = sliceContent.replace('<b>', '').replace('</b>', '');
                    return (
                        <b key={index}>
                            {this.parseInnerLinkMath(bCont)}
                        </b>
                    );
                } else {
                    return this.parseInnerLinkMath(sliceContent);
                }
            });
        } else {
            return this.parseInnerLinkMath(content);
        }
    }

    parseInnerLinkMath = (content) => {
        let slices = content.split(/(<a*.*?<\/a>)/g);
        if (slices.length > 1) {
            return slices.map((sliceContent, index) => {
                if (sliceContent.search('<a') !== -1) {
                    let tag = sliceContent.match(/<([^>]*)\b[^>]*>/)[0];
                    let text = sliceContent.replace(tag, '').replace('</' + tag.slice(1), '');

                    let tagArray = tag.split(" ");
                    tag = tagArray[0] + '>';
                    let attributes = tagArray[1].slice(0, -1).split('=');
                    text = text.replace('</' + tag.slice(1), '');
                    return (
                        <a key={index} href={attributes[1].replace(/"/g, '')}>
                            {this.parseInnerMath(text)}
                        </a>
                    );
                } else {
                    if (sliceContent) {
                        return this.parseInnerMath(sliceContent);
                    } else {
                        return '';
                    }
                }
            });
        } else {
            return this.parseInnerMath(content);
        }
    }

    parseInnerMath = (content) => {
        let slices = content.split(/(<math*>.*?<\/math>)/g);

        if (slices.length > 1) {
            return slices.map((sliceContent, index) => {
                if (sliceContent.search('<math>') !== -1) {
                    let mathCont = sliceContent.replace('<math>', '').replace('</math>', '');
                    return (
                        <MathJax.Context input='ascii' key={index}>
                            <MathJax.Node inline>{mathCont}</MathJax.Node>
                        </MathJax.Context>
                    );
                } else {
                    return sliceContent;
                }
            });
        } else {
            return content;
        }
    }

    convertPostToHTML = (content) => {
        var tagSeparator = /<([^>]*)\b[^>]*>.*?<\/\1>/gs;
        var listContent = content.match(tagSeparator);
        let eqNum = 0;
        if (listContent) {
            return listContent.map((par, index) => {
                let tag = par.match(/<([^>]*)\b[^>]*>/)[0];
                let innerContent = par.replace(tag, '').replace('</' + tag.slice(1), '');

                let tagArray = tag.split(" ");
                let attributes = '';
                if (tagArray.length > 1) {
                    tag = tagArray[0] + '>';
                    attributes = tagArray[1].slice(0, -1).split('=');
                    innerContent = innerContent.replace('</' + tag.slice(1), '')
                }

                switch (tag) {
                    case ('<h2>'):
                        return (
                            <h2 key={index}>
                                {innerContent}
                            </h2>
                        );
                    case ('<h3>'):
                        return (
                            <h3 key={index}>
                                {innerContent}
                            </h3>
                        );
                    case ('<p>'):
                        return (
                            <p key={index}>
                                { this.parseInnerBoldLinkMath(innerContent) }
                            </p>
                        );
                    case ('<ul>'):
                        let listLi = innerContent.match(tagSeparator);
                        return listLi.map((li, index) => {
                            return (
                                <li key={index}>
                                    { this.parseInnerBoldLinkMath(li.replace('<li>', '').replace('</li>', ''))}
                                </li>
                            );
                        });
                    case ('<button>'):
                        return (
                            <div className={classes.Button} key={index}>
                                {this.parseInnerLinkMath(innerContent)}
                            </div>
                        );
                    case ('<img>'):
                        let src = attributes[1].replace(/"/g, '');
                        return (
                            <img
                                className={classes.FeaturedImage}
                                key={index}
                                src={src}
                                alt={innerContent} />
                        );
                    case ('<note>'):
                        return (
                            <div className={classes.Note} key={index}>
                                {this.parseInnerBoldLinkMath(innerContent)}
                            </div>
                        );
                    case ('<code>'):
                        return (
                            <SyntaxHighlighter key={index} language={attributes[1].replace(/"/g, '')} style={docco}>
                                {innerContent}
                            </SyntaxHighlighter>
                        );
                    case ('<jupyter>'):
                        return (
                            <div
                                key={index}
                                className={classes.Jupyter}
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(innerContent) }} />
                        );
                    case ('<equation>'):
                        eqNum += 1;
                        return (
                            <MathJax.Context key={index} input='ascii'>
                                <div style={{ textAlign: 'center' }}>
                                    <MathJax.Node>{innerContent}</MathJax.Node>
                                    <span className={classes.EqNumber}>
                                        {'(' + eqNum + ')'}
                                    </span>
                                </div>
                            </MathJax.Context>
                        );
                    default:
                        return (
                            <p key={index}>
                                {innerContent}
                            </p>
                        );
                }
            });
        }
        else {
            return content;
        }
    }

    render() {
        let post = <Spinner />
        let loadedPost = null;
        if (this.props.posts.length > 0) {
            loadedPost = this.props.posts.find(post =>
                post.id.toString() === this.props.match.params.id
            );
        } else if (!this.props.loading) {
            loadedPost = this.props.posts;
        };
        if (loadedPost) {
            let featuredImage = null;
            let tags = [];
            let datePublished = null;
            if (loadedPost.featured_image) {
                featuredImage = <img
                    className={classes.FeaturedImage}
                    src={loadedPost.featured_image.image}
                    alt={loadedPost.featured_image.name}
                />;
            };
            if (loadedPost.tags) {
                tags = loadedPost.tags.join(', ');
            };
            if (loadedPost.created_date) {
                datePublished = loadedPost.created_date
                    .replace(/-/g, '/').replace('T', ', ').replace('Z', '');
            };
            let rating =
                <>
                    <span className={["fa fa-star", classes.Fa, classes.FaChecked].join(' ')}></span>
                    <span className={["fa fa-star", classes.Fa, classes.FaChecked].join(' ')}></span>
                    <span className={["fa fa-star", classes.Fa, classes.FaChecked].join(' ')}></span>
                    <span className={["fa fa-star", classes.Fa, classes.FaChecked].join(' ')}></span>
                    <span className={["fa fa-star", classes.Fa, classes.FaChecked].join(' ')}></span>
                </>
            post =
                <div className={classes.LoadedPost}>
                    <h1 className={classes.Title}>
                        {loadedPost.title}
                    </h1>
                    <div className={classes.Info}>
                        {datePublished} | <span style={{ color: '#91bdcf' }}>{tags}</span> | {rating}
                    </div>
                    {featuredImage}
                    <div className={classes.Text}>
                        {loadedPost.text && this.convertPostToHTML(loadedPost.text)}
                    </div>
                </div>
        }
        return (
            <div>
                {post}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        posts: state.blog.posts,
        loading: state.blog.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPosts: (postId) => dispatch(actions.fetchPosts(postId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadedPost);
