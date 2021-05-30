import * as actionTypes from './actionTypes';
import axios from '../../axios-blog';

export const fetchPostsStart = () => {
    return {
        type: actionTypes.FETCH_POSTS_START,
    };
};

export const fetchPostsSuccess = ( posts ) => {
    return {
        type: actionTypes.FETCH_POSTS_SUCCESS,
        posts: posts
    };
};

export const fetchPostsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_POSTS_FAIL,
        error: error
    };
};

export const fetchPosts = ( postId ) => {
    return dispatch => {
        dispatch(fetchPostsStart());
        let queryParams = '/posts/';
        if ( postId ) {
            queryParams += postId + '/'
        }
        axios.get(queryParams).then(res => {
            dispatch(fetchPostsSuccess(res.data));
        } ).catch( err => {
            dispatch(fetchPostsFail(err));
        } );
    };
};
