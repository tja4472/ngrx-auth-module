// tslint:disable:no-debugger

import {
  browser,
  by,
  element,
  ExpectedConditions,
  Key,
  until,
} from 'protractor';
import { AppPage } from './app.po';
import { getProperty, getText, setProperty, waitTime } from './ionic-utils';
import { removeFirebaseAutoSignIn } from './utils';

describe('new App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });
  describe('default screen', () => {
    beforeEach(async () => {
      await removeFirebaseAutoSignIn();
      await browser.get('/sign-in');
      /*
      await browser.get('/home');
      // Should be signed out, so should be redirected.
      await browser.wait(
        until.urlContains('/sign-in'),
        15 * 1000,
        'Should redirect to `/sign-in`'
      );
      */
    });

    it('should have page title `Sign In`', async () => {
      await browser.get('/sign-in');
      expect(
        await element(
          by.css('tja-sign-in-page [data-test=sign-in-page-title]')
        ).getText()
      ).toEqual('Sign In');
    });

    it('should have a user saying `Not Signed In`', async () => {
      expect(await page.getMenuUserText()).toEqual('Not Signed In');
    });

    it('should have an invalid form', async () => {
      expect(
        await element(by.css('tja-sign-in-page form')).getAttribute('class')
      ).toContain('ng-invalid');
    });

    it('should have a disabled sign in button', async () => {
      expect(
        await getProperty(
          'tja-sign-in-page [data-test=sign-in-button]',
          'disabled'
        )
      ).toEqual(true);
    });

    it('should redirect to `/home` on sign in', async () => {
      await setProperty('[data-test=email-input]', 'value', 'a.a@a.com');
      await setProperty('[data-test=password-input]', 'value', 'password');

      /*      
      const button = await browser.wait(
        until.elementLocated(by.css('[data-test=sign-in-button]')),
        15 * 1000,
        'Locating [data-test=sign-in-button]'
      );
*/

      expect(
        await getProperty('[data-test=sign-in-button]', 'disabled')
      ).toBeFalsy();

      expect(
        await element(by.css('tja-sign-in-page form')).getAttribute('class')
      ).toContain('ng-valid');

      // await button.click();
      /*
      const EC = ExpectedConditions;
      await browser.wait(
        EC.elementToBeClickable(element(by.css('[data-test=sign-in-button]'))),
        15 * 1000,
        'kkkkkkkkkkkkkkkkkkkkkk'
      );
      */

      await element(by.css('[data-test=sign-in-button]')).click();

      await browser.wait(
        until.urlContains('/home'),
        15 * 1000,
        'Should redirect to `/home`'
      );

      expect(
        await browser
          .wait(
            until.elementLocated(by.css('app-home [data-test=home-page-title]'))
          )
          .getText()
      ).toEqual('Home');
    });
  });
});
