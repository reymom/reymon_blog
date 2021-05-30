import * as actionTypes from './actionTypes';
import axios from '../../axios-blog';

export const fetchProjectsStart = () => {
    return {
        type: actionTypes.FETCH_PROJECTS_START,
    };
};

export const fetchProjectsSuccess = ( projects ) => {
    return {
        type: actionTypes.FETCH_PROJECTS_SUCCESS,
        projects: projects
    };
};

export const fetchProjectsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_PROJECTS_FAIL,
        error: error
    };
};

export const fetchProjects = () => {
    return dispatch => {
        dispatch(fetchProjectsStart());
        axios.get('/projects/').then(res => {
            dispatch(fetchProjectsSuccess(res.data));
        } ).catch( err => {
            dispatch(fetchProjectsFail(err));
        } );
    };
};
