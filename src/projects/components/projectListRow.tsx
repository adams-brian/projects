import * as React from 'react';
import { IProject } from '../store';

interface IProjectListRowProps {
  project: IProject;
  openProject: (id: string) => void;
  deleteProject: (id: string) => void;
}

export default class ProjectListRow extends React.Component<IProjectListRowProps> {
  public render() {
    return (
      <tr onClick={this.openProject}>
        <td>{this.props.project.name}</td>
        <td>
          <button onClick={this.deleteProject}>
            <span className="fa fa-times"/>
          </button>
        </td>
      </tr>
    );
  }
  private openProject = () => {
    this.props.openProject(this.props.project.id);
  }
  private deleteProject = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    this.props.deleteProject(this.props.project.id);
  }
}
