## Generate a `Task` feature set within a `task` folder and register it with the `task.module.ts` file in the same `task` folder.

```sh
ng generate module Task --flat false --routing
ng generate @ngrx/schematics:feature task/Task --module task/task.module.ts --group
```

### ng generate module Task --flat false --routing

```sh
CREATE src/app/task/task-routing.module.ts (247 bytes)
CREATE src/app/task/task.module.spec.ts (259 bytes)
CREATE src/app/task/task.module.ts (271 bytes)
```

### ng generate @ngrx/schematics:feature task/Task --module task/task.module.ts

```sh
CREATE src/app/task/actions/task.actions.ts (234 bytes)
CREATE src/app/task/reducers/task.reducer.ts (381 bytes)
CREATE src/app/task/reducers/task.reducer.spec.ts (322 bytes)
CREATE src/app/task/effects/task.effects.ts (331 bytes)
CREATE src/app/task/effects/task.effects.spec.ts (577 bytes)
UPDATE src/app/task/task.module.ts (567 bytes)
```



### ng generate @ngrx/schematics:action home/HomePage --group
```sh
CREATE src/app/home/actions/home-page.actions.ts (270 bytes)
```

### ng generate @ngrx/schematics:effect home/HomePage --group --module home/home.module.ts
```sh
CREATE src/app/home/effects/home-page.effects.ts (187 bytes)
CREATE src/app/home/effects/home-page.effects.spec.ts (602 bytes)
UPDATE src/app/home/home.module.ts (675 bytes)
```



## Other stuff

Tree type is not supported.

Error "Tree type is not supported." when generating new module in v6.1.1
https://github.com/angular/angular-cli/issues/11683

V4: ionic generate class fails immediately on new blank app
https://github.com/ionic-team/ionic-cli/issues/3458
