import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-blog';

import classes from './Projects.module.css';
import * as actions from '../../store/actions';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import Project from '../../components/Project/Project';

class Projects extends Component {

    componentDidMount() {
        this.props.onFetchProjects();
        document.title = 'Reymon | Projects';
    }

    render() {
        let activeProjects = <Spinner/>;
        let pastProjects = <Spinner/>;
        if (!this.props.loading & this.props.projects.length > 0) {
            activeProjects = this.props.projects.map(project => {
                if (project.active) {
                    return (
                        <Project
                            key={project.id}
                            image={project.image}
                            name={project.name}
                            summary={project.summary}
                            active={true}
                            link={project.link}
                        />
                    );
                } else {
                    return '';
                }
            })
            pastProjects = this.props.projects.map(project => {
                if (!project.active) {
                    return (
                        <Project
                            key={project.id}
                            image={project.image}
                            name={project.name}
                            summary={project.summary}
                            active={false}
                            link={project.link}
                        />
                    );
                } else {
                    return '';
                }
            })
        }

        return (
            <div className={classes.ProjectsPage}>
                <h1>Active Projects</h1>
                <section className={classes.Projects}>
                    {activeProjects}
                </section>
                <h1>Past Projects</h1>
                <section className={classes.Projects}>
                    {pastProjects}
                </section>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        projects: state.projects.projects,
        loading: state.projects.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchProjects: () => dispatch(actions.fetchProjects())
    };
};

export default connect(
    mapStateToProps, mapDispatchToProps
)(withErrorHandler(Projects, axios));