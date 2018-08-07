import { Action } from '@ngrx/store';
import { TaskActions, TaskActionTypes } from '../actions/task.actions';

export interface State {

}

export const initialState: State = {

};

export function reducer(state = initialState, action: TaskActions): State {
  switch (action.type) {

    case TaskActionTypes.LoadTasks:
      return state;


    default:
      return state;
  }
}
