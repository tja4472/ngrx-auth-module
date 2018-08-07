import { CommonModule } from '@angular/common';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthEffects } from './effects/auth.effects';
import { reducers } from './reducers';

import { IonicModule } from '@ionic/angular';

import { ReactiveFormsModule } from '@angular/forms';

import { SignInPageComponent } from './containers/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './containers/sign-up-page/sign-up-page.component';

import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';

import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { UserInfoDataService } from './services/user-info.data.service';

export const COMPONENTS = [
  SignInPageComponent,
  SignInFormComponent,
  SignUpFormComponent,
  SignUpPageComponent,
];

// https://angular.io/guide/singleton-services

@NgModule({
  imports: [
    ReactiveFormsModule,
    IonicModule,
    CommonModule,
    // AuthRoutingModule,
    // StoreModule.forFeature('auth', reducers),
    // EffectsModule.forFeature([AuthEffects])
  ],
  declarations: COMPONENTS,
  // exports: [SignInPageComponent]
  // exports: COMPONENTS,
})
export class AuthModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: AuthModule
  ) {
    if (parentModule) {
      throw new Error(
        'AuthModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  // tslint:disable-next-line:member-ordering
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAuthModule,
      providers: [AuthService, AuthGuardService, UserInfoDataService],
    };
  }
}

// tslint:disable-next-line:max-classes-per-file
@NgModule({
  imports: [
    AuthModule,
    AuthRoutingModule,
    StoreModule.forFeature('auth-feature', reducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class RootAuthModule {}
