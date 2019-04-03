import { waitTime } from './ionic-utils';
import { removeFirebaseAutoSignIn } from './utils';

import {
  browser,
  by,
  element,
  ExpectedConditions,
  Key,
  until,
} from 'protractor';

describe('protractor reference 0', () => {
  describe('list page - before sign in', () => {
    beforeEach(async () => {
      await removeFirebaseAutoSignIn();      
      await browser.get('/list');
    });

    it('should have a user saying `Not Signed In`', async () => {
      expect(await element(by.tagName('tja-menu-auth')).getText()).toEqual(
        'Not Signed In'
      );
    }); 

    it('should have page title `Ionic Blank`', async () => {
      expect(
        await element(by.css('[data-test=list-page-title]')).getText()
      ).toEqual('Ionic Blank');
    });
  });

  describe('sign in page', () => {
    beforeEach(async () => {
      // await browser.get('/sign-in');
    });

    it('should have page title `Sign In`', async () => {
      await browser.get('/sign-in');
      expect(
        await element(by.css('[data-test=sign-in-page-title]')).getText()
      ).toEqual('Sign In');
    });

    it('should sign in and redirect to `/home`', async () => {
      await removeFirebaseAutoSignIn();  
      await browser.get('/sign-in');
      const emailIonInput = element(by.css('[data-test=email-input'));
      await emailIonInput.click();
      const emailInput = emailIonInput.element(by.css('input'));
      await emailInput.click();
      await emailInput.sendKeys('a.a@a.com');

      const passwordIonInput = element(by.css('[data-test=password-input'));
      await passwordIonInput.click();
      const passwordInput = passwordIonInput.element(by.css('input'));
      await passwordInput.click();
      await passwordInput.sendKeys('password');

      await element(by.css('[data-test=sign-in-button]')).click();
      // await waitTime(5 * 1000);

      await browser.wait(
        until.urlContains('/home'),
        15 * 1000,
        'Should redirect to `/home`'
      );
      /*
       expect(
        await element(by.css('[data-test=home-page-title]')).getText()
      ).toEqual('Home');       
*/

      expect(
        await browser
          .wait(until.elementLocated(by.css('[data-test=home-page-title]')))
          .getText()
      ).toEqual('Home');

      expect(
        await browser
          .wait(until.elementLocated(by.tagName('tja-menu-auth')))
          .getText()
      ).toEqual('a.a@a.com');
    });

    it('should have a user saying `a.a@a.com`', async () => {
      await browser.get('/list');

      // Need to allow time for auto sign in.
      const userWebElement = await browser.wait(
        until.elementLocated(by.tagName('tja-menu-auth'))
      );

      await browser.wait(
        until.elementTextIs(userWebElement, 'a.a@a.com'),
        15 * 1000,
        'Should be user `a.a@a.com`'
      );
    });
  });

  describe('describe still signed in', () => {
    it('should have a user saying `a.a@a.com`', async () => {
      await browser.get('/list');

      // Need to allow time for auto sign in.
      const userWebElement = await browser.wait(
        until.elementLocated(by.tagName('tja-menu-auth'))
      );

      await browser.wait(
        until.elementTextIs(userWebElement, 'a.a@a.com'),
        15 * 1000,
        'Should be user `a.a@a.com`'
      );
    });
  });
});

describe('Outer describe still signed in', () => {
  it('should have a user saying `a.a@a.com`', async () => {
    await browser.get('/list');

    // Need to allow time for auto sign in.
    const userWebElement = await browser.wait(
      until.elementLocated(by.tagName('tja-menu-auth'))
    );

    await browser.wait(
      until.elementTextIs(userWebElement, 'a.a@a.com'),
      15 * 1000,
      'Should be user `a.a@a.com`'
    );
  });
});
