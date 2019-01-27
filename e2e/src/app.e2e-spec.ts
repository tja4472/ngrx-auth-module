import { AppPage } from './app.po';

export function waitTime(time: number) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

describe('new App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });
  describe('default screen', () => {
    beforeEach(() => {
      page.navigateTo('/home');
    });

    it('should have a title saying `Sign In`', async () => {

      // await waitTime(500);
      
     await page.getPageOneTitleText().then((title) => {
             // tslint:disable-next-line:no-debugger
      debugger;
        expect(title).toEqual('Sign In');
      });
    });

    it('should have a user saying `Not Signed In`', async () => {
      await waitTime(500);
      await page.getMenuUserText().then((text) => {
        expect(text).toEqual('Not Signed In');
      });
    });
  });
});
