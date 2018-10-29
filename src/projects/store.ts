import { Action, combineReducers } from 'redux';

export interface IProject {
  id: string;
  name: string;
}

export interface IState {
  projects: {
    error: string;
    loaded: boolean;
    list: IProject[];
  }
}

/* tslint:disable:max-classes-per-file */
export const DELETE_PROJECT = '[Projects] DELETE';
export class DeleteProject implements Action {
  public readonly type = DELETE_PROJECT;
  constructor(public payload: string) { }
}
export const LOAD_PROJECTS = '[Projects] LOAD PROJECTS';
export class LoadProjects implements Action {
  public readonly type = LOAD_PROJECTS;
}
export const PROJECTS_ERROR = '[Projects] PROJECTS ERROR';
export class ProjectsError implements Action {
  public readonly type = PROJECTS_ERROR;
  constructor(public payload: Error) { }
}
export const PROJECTS_LOADED = '[Projects] PROJECTS LOADED';
export class ProjectsLoaded implements Action {
  public readonly type = PROJECTS_LOADED;
}
export const PROJECTS_UPDATED = '[Projects] PROJECTS UPDATED';
class ProjectsUpdated implements Action {
  public readonly type = PROJECTS_UPDATED;
  constructor(public payload: IProject[]) { }
}
export type ProjectsAction = DeleteProject | LoadProjects | ProjectsError | ProjectsLoaded | ProjectsUpdated;

export const actionCreators = {
  deleteProject: (id: string) => Object.assign({}, new DeleteProject(id)),
  loadProjects: () => Object.assign({}, new LoadProjects()),
  projectsError: (err: Error) => Object.assign({}, new ProjectsError(err)),
  projectsLoaded: () => Object.assign({}, new ProjectsLoaded()),
  projectsUpdated: (projects: IProject[]) => Object.assign({}, new ProjectsUpdated(projects)),
};

export const listReducer = (state: IProject[] = [], action: ProjectsAction) => {
  switch (action.type) {
    case DELETE_PROJECT:
      return state.filter(project => project.id !== action.payload);
    case PROJECTS_UPDATED:
      return [...action.payload];
    default:
      return state;
  }
};

export const loadedReducer = (state: boolean = false, action: ProjectsAction) => {
  switch (action.type) {
    case PROJECTS_LOADED:
      return true;
    default:
      return state;
  }
}

export const errorReducer = (state: string = '', action: ProjectsAction) => {
  switch (action.type) {
    case PROJECTS_ERROR:
      return action.payload.message;
    default:
      return state;
  }
}

export const reducers = {
  projects: combineReducers({
    error: errorReducer,
    list: listReducer,
    loaded: loadedReducer
  })
};
