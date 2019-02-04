import { browser } from 'protractor';

/*
export function removeFirebaseAutoSignIn() {
  return browser.executeScript(
    'window.indexedDB.deleteDatabase("firebaseLocalStorageDb")'
  );
}
*/
export async function removeFirebaseAutoSignIn() {
  // When called from the first test this will error.
  // So swallow errors in catch.
  try {
    await browser.executeScript(
      'window.indexedDB.deleteDatabase("firebaseLocalStorageDb")'
    );
  } catch (e) {
    // console.log('there was an error');
    // console.log(e);
  }
}
