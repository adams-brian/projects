import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import loading, { IDispatchProps, IStateProps } from '../../common/components/loading';
import { actionCreators, IState } from '../store';
import Project from './project';
import ProjectList from './projectList';

export function Projects() {
  return (
    <Switch>
      <Route exact={true} path="/projects" component={ProjectList}/>
      <Route path="/projects/:id" component={Project}/>
    </Switch>
  );
}

export const mapStateToProps = (state: IState) => ({
  error: state.projects.error,
  loaded: state.projects.loaded
});

export const mapDispatchToProps = {
  load: actionCreators.loadProjects
};

export default connect<IStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(
  loading(Projects)
);
