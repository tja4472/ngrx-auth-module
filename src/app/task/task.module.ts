import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TaskEffects } from './effects/task.effects';
import * as fromTask from './reducers/task.reducer';
import { TaskRoutingModule } from './task-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TaskRoutingModule,
    StoreModule.forFeature('task', fromTask.reducer),
    EffectsModule.forFeature([TaskEffects])
  ],
  declarations: []
})
export class TaskModule { }
