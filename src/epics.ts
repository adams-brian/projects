import { combineEpics, Epic, ofType } from 'redux-observable';
import { concat, from, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

import { actionCreators as projectsActionCreators, IProject, LOAD_PROJECTS } from './projects/store';

const loadProjects = () => new Promise<IProject[]>((resolve) => {
  setTimeout(() => {
    resolve([
      {
        id: '1',
        name: 'project 1'
      },
      {
        id: '2',
        name: 'project 2'
      }
    ]);
  }, 1000);
});

export const loadProjectsEpic: Epic = (action$) => action$.pipe(
  ofType(LOAD_PROJECTS),
  mergeMap(() =>
    from(loadProjects()).pipe(
      mergeMap(data =>
        concat(
          of(projectsActionCreators.projectsUpdated(data)),
          of(projectsActionCreators.projectsLoaded())
        )
      ),
      catchError(err => {
        return of(projectsActionCreators.projectsError(err));
      })
    )
  )
);

export default combineEpics(
  loadProjectsEpic
);
