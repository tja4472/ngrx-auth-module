import { browser, by, element, until } from 'protractor';
import { AppPage } from './app.po';

// https://github.com/ionic-team/ionic/blob/master/angular/test/test-app/e2e/src/utils.ts
export function waitTime(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export function getText(selector: string) {
  return browser.executeScript(`
    return document.querySelector('${selector}').textContent;
  `);
}

export function getProperty(selector: string, property: string) {
  return browser.executeScript(`
    return document.querySelector('${selector}')['${property}'];
  `);
}
export function setProperty(selector: string, property: string, value: any) {
  const text = JSON.stringify(value);
  return browser.executeScript(`
    document.querySelector('${selector}')['${property}'] = ${text};
  `);
}

describe('new App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });
  describe('default screen', () => {
    beforeEach(async () => {
      // Remove Firebase autologin.
      // indexedDB.deleteDatabase('firebaseLocalStorageDb');
      // browser.executeScript('window.localStorage.clear();');
      // await browser.restart();
      // await page.navigateTo('/home');
      await browser.get('/home');
      // Should be signed out, so should be redirected.
      await browser.wait(until.urlContains('/sign-in'));
    });

    it('test-1', async () => {
      const title = await browser.wait(
        until.elementLocated(by.css('[data-test=page-title]'))
      );
      expect(title.getText()).toEqual('Sign In');

      expect(
        await getProperty('[data-test=sign-in-button]', 'disabled')
      ).toEqual(true);
      await setProperty('[data-test=email-input]', 'value', 'a.a@a.com');
      await setProperty('[data-test=password-input]', 'value', 'password');

      // expect(await  aaa.isEnabled()).toEqual(true);

      expect(
        await getProperty('[data-test=sign-in-button]', 'disabled')
      ).toEqual(false);

      await element(by.css('[data-test=sign-in-button]')).click();
    });

    it('test-2', async () => {
      const aaa = await browser.wait(
        until.elementLocated(by.css('[data-test=sign-in-button]'))
      );
      expect(await aaa.isEnabled()).toEqual(true);
    });

    xit('should have a title saying `Sign In`', async () => {
      // await browser.wait(until.urlContains('/sign-in'));
      // await waitTime(500);

      // await browser.waitForAngularEnabled(true);

      /*
      await page.getPageOneTitleText().then((title) => {
        console.log('title >', title, '<');

        expect(title).toEqual('Sign In');
      });
      */
      // expect(await page.getPageOneTitleText()).toEqual('Sign In');
      /*
      expect(
        await element(by.deepCss('[data-test=page-title]')).getText()
      ).toEqual('Sign In');;
      */

      expect(await getText('[data-test=page-title]')).toEqual(' Sign In ');

      expect(
        await getProperty('[data-test=sign-in-button]', 'disabled')
      ).toEqual(true);

      await setProperty('[data-test=email-input]', 'value', 'a.a@a.com');
      await setProperty('[data-test=password-input]', 'value', 'password');

      // tslint:disable-next-line:no-debugger
      debugger;

      expect(
        await getProperty('[data-test=sign-in-button]', 'disabled')
      ).toEqual(false);
      await element(by.css('[data-test=sign-in-button]')).click();

      // await browser.waitForAngularEnabled(true);
      // expect(await page.getMenuUserText()).toEqual('Not Signed In');
    });

    it('should have a user saying `Not Signed In`', async () => {
      expect(await page.getMenuUserText()).toEqual('Not Signed In');
    });
  });
});
