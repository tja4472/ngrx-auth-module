import { getProperty, waitTime } from './ionic-utils';
import { removeFirebaseAutoSignIn } from './utils';

import {
  browser,
  by,
  element,
  ExpectedConditions,
  Key,
  until,
} from 'protractor';

describe('protractor reference 1: describe in separate file', () => {
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

describe('protractor reference 1: indexedDB.deleteDatabase', () => {
  beforeEach(async () => {
    // Remove Firebase auto sign in.
    /*
    await browser.executeScript(
      'indexedDB.deleteDatabase("firebaseLocalStorageDb");'
    );
    */
    await removeFirebaseAutoSignIn();
    await browser.get('/list');
  });

  it('should have a user saying `Not Signed In`', async () => {
    // Need to allow time for auto sign in.
    await waitTime(5 * 1000);
    expect(await element(by.tagName('tja-menu-auth')).getText()).toEqual(
      'Not Signed In'
    );
  });
});

describe('protractor reference 1: sign in', () => {
  beforeEach(async () => {
    // Remove Firebase auto sign in.
    /*
    await browser.executeScript(
      'indexedDB.deleteDatabase("firebaseLocalStorageDb");'
    );
    */
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
    await waitTime(5 * 1000);
    await browser.get('/list');
  });

  it('should have a user saying `a.a@a.com`', async () => {
    // Need to allow time for auto sign in.
    const userWebElement = await browser.wait(
      until.elementLocated(by.tagName('tja-menu-auth'))
    );

    await browser.wait(
      until.elementTextIs(userWebElement, 'a.a@a.com'),
      15 * 1000,
      'Should be user `a.a@a.com`'
    );

    // Need to allow time for auto sign in.
    // await waitTime(15 * 1000);
    // expect(await element(by.tagName('tja-menu-auth')).getText()).toEqual(
    //   'a.a@a.com'
    // );
  });
});

describe('protractor reference 1: ion-button', () => {
  beforeEach(async () => {
    // Remove Firebase auto sign in.
    /*
    await browser.executeScript(
      'window.indexedDB.deleteDatabase("firebaseLocalStorageDb");'
    );
    */
    await removeFirebaseAutoSignIn();
    await browser.get('/sign-in');
  });

  it('getProperty', async () => {
    expect(
      await getProperty('[data-test=sign-in-button]', 'disabled')
    ).toEqual(true);   
    expect(
      await getProperty('[data-test=sign-in-button]', 'expand')
    ).toEqual('block');      
  });
});
