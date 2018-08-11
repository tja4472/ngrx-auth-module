import { Injectable } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { AlertOptions } from '@ionic/core';

import { AuthFacade } from '@app/auth/facades/auth.facade';

/*
@Injectable({
  providedIn: 'root'
})
*/
@Injectable()
export class SignOutConfirmationAlertService {
  constructor(
    private alertCtrl: AlertController,
    private authFacade: AuthFacade
  ) {}

  public async show() {
    const options: AlertOptions = {
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // console.log('Cancel============');
            this.authFacade.SignOutConfirmationCancel();
          },
        },
        {
          text: 'Ok',
          handler: () => {
            // console.log('OK============');
            this.authFacade.SignOutConfirmationOk();
          },
        },
      ],
      header: 'Sign Out',
      enableBackdropDismiss: false,
      message: 'Are you sure you want to sign out?',
    };
    const alert = await this.alertCtrl.create(options);
    await alert.present();
  }
}
