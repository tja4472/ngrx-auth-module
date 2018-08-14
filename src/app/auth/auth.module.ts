import { CommonModule } from '@angular/common';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthRoutingModule } from '@app/auth/auth-routing.module';
import { AuthEffects } from '@app/auth/effects/auth.effects';
import { reducers } from '@app/auth/reducers';

import { IonicModule } from '@ionic/angular';

import { ReactiveFormsModule } from '@angular/forms';

import { SignInPageComponent } from '@app/auth/containers/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from '@app/auth/containers/sign-up-page/sign-up-page.component';

import { SignInFormComponent } from '@app/auth/components/sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from '@app/auth/components/sign-up-form/sign-up-form.component';

import { AuthFacade } from '@app/auth/facades/auth.facade';
import { SignOutConfirmationAlertFacade } from '@app/auth/facades/sign-out-confirmation-alert.facade';
import { AuthGuardService } from '@app/auth/services/auth-guard.service';
import { AuthService } from '@app/auth/services/auth.service';
import { SignOutConfirmationAlertService } from '@app/auth/services/sign-out-confirmation-alert.service';
import { UserInfoDataService } from '@app/auth/services/user-info.data.service';

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
      providers: [
        SignOutConfirmationAlertFacade,
        SignOutConfirmationAlertService,
        AuthFacade,
        AuthService,
        AuthGuardService,
        UserInfoDataService,
      ],
    };
  }
}

// tslint:disable-next-line:max-classes-per-file
@NgModule({
  imports: [
    AuthModule,
    AuthRoutingModule,
    StoreModule.forFeature('authFeature', reducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class RootAuthModule {}
