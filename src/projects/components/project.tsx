import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { IProject, IState } from '../store';

export class Project extends React.Component<IProject> {
  public render() {
    return (
      <div>{this.props.name}</div>
    )
  }
}

export const mapStateToProps = (state: IState, props: RouteComponentProps<{ id: string }>) => ({
  ...state.projects.list.find(p => p.id === props.match.params.id)
});

export default connect(
  mapStateToProps
)( Project );
