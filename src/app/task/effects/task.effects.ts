import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TaskActionTypes } from '../actions/task.actions';

@Injectable()
export class TaskEffects {

  @Effect()
  loadFoos$ = this.actions$.pipe(ofType(TaskActionTypes.LoadTasks));

  constructor(private actions$: Actions) {}
}
