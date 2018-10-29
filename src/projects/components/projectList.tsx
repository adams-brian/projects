import { push } from 'connected-react-router';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Action, Dispatch } from 'redux';

import { actionCreators, IProject, IState, ProjectsAction } from '../store';
import ProjectListRow from './projectListRow';

interface IProjectListProps {
  list: IProject[];
  deleteProject: (id: string) => void;
  openProject: (id: string) => void;
}

export const ProjectList = (props: IProjectListProps) => (
  <div className="project-list-container">
    <h1 className="project-list-header">Projects</h1>
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Project Name</th>
          <th style={{width: '1px'}}/>
        </tr>
      </thead>
      <tbody>
        {props.list.map(project =>
          <ProjectListRow 
            key={project.id}
            project={project}
            openProject={props.openProject}
            deleteProject={props.deleteProject}
          />
        )}
      </tbody>
    </table>
    <Link className="create-project" to="/projects/createproject">
      <button type="button" className="btn btn-primary">Create Project</button>
    </Link>
  </div>
);

export const mapStateToProps = (state: IState) => 
  ({ list: state.projects.list });

export const mapDispatchToProps = (dispatch: Dispatch<ProjectsAction | Action<any>>) => ({
  deleteProject: (id: string) => dispatch(actionCreators.deleteProject(id)),
  openProject: (id: string) => { dispatch(push('/projects/' + id)); }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ProjectList );
