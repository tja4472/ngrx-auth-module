// tslint:disable-next-line:no-implicit-dependencies
import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(destination) {
    return browser.get(destination);
  }

  getTitle() {
    return browser.getTitle();
  }

  getPageOneTitleText() {
    return element(by.deepCss('[data-test=page-title]')).getText();
    // browser.waitForAngularEnabled(false);
    // return element(by.tagName('ion-router-outlet')).getText();

    // element(by.tagName('ion-router-outlet'))
    //  element(by.deepCss('[data-test=page-title]'))
    // .element(by.deepCss('ion-header'))
    //  .getText();
  }

  getMenuUserText() {
    return element(by.tagName('tja-menu-auth')).getText();
  }
}
