import { getMenuTitle, navigateTo } from '../support/po';

// it.only

describe('app - signed out', () => {
  beforeEach(() => {
    // Remove Firebase autologin.
    indexedDB.deleteDatabase('firebaseLocalStorageDb');
  });

  it('should display menu title, Menu', () => {
    navigateTo();
    getMenuTitle().contains('Menu');
  });

  it('should goto `/list', () => {
    cy.visit('http://localhost:4200/list');
    cy.url().should('include', '/list');
  });

  it('should have user `Not Signed In` on list page', () => {
    cy.visit('http://localhost:4200/list');
    cy.get('tja-menu-auth').should('contain', 'Not Signed In');
    cy.get('tja-menu-auth').contains('Not Signed In');
  });

  it('should redirect to `/sign-in` when going to `home`', () => {
    cy.visit('http://localhost:4200/home');
    cy.url().should('include', '/sign-in');
  });

  /*
  // it('redirects to /dashboard on success', function(){
  it('test 1', () => {
    // cy.pause();
    cy.get('[data-test=email-input] > .native-input').type('a.a@a.com');
    cy.get('[data-test=password-input] > .native-input').type('password');
    cy.get('[data-test=sign-in-button]').click();
    // cy.pause();
          // we should be redirected to /home
          // cy.url().should('include', '/home')
  });
 */
  /*
  it('test 2', () => {
    // cy.pause();

    // cy.get('[data-test=sign-in-button]').should('be.disabled');
    // cy.get('ion-row.hydrated > :nth-child(1)').should('be.disabled');
    // 
    // Add support for shadow dom 
    // https://github.com/cypress-io/cypress/issues/144

    // https://github.com/cypress-io/cypress/issues/830
    // https://gist.github.com/egucciar/5f31c84f19190b5e64737a9d80eb7a9d
    cy.get('[data-test=sign-in-button]').get('button').contains('SIGN IN');
  });
  */
});

describe('sign-in page', () => {
  beforeEach(() => {
    // Remove Firebase autologin.
    indexedDB.deleteDatabase('firebaseLocalStorageDb');
    cy.visit('http://localhost:4200/sign-in');
  });

  it('should have page title `Sign In`', () => {
    cy.get('tja-sign-in-page [data-test=sign-in-page-title]').contains(
      'Sign In'
    );
  });

  it('should have disabled `SIGN IN` button', () => {
    cy.get('tja-sign-in-page [data-test=sign-in-button]').should(
      'have.attr',
      'disabled'
    );

    cy.get('tja-sign-in-page [data-test=sign-in-button]').should(
      'have.attr',
      'expand',
      'block'
    );
    // cy.get('tja-sign-in-page [data-test=sign-in-button]').its('disable').should ('be.false');
  });

  it('should have an invalid form', () => {
    // cy.get('tja-sign-in-page form').should('have.attr', 'class').contains('AAng-invalid');
    cy.get('tja-sign-in-page form').should('have.class', 'ng-invalid');
  });

  it('should have enabled `SIGN IN` button', () => {
    cy.get('[data-test=email-input] > .native-input').type('a.a@a.com');
    cy.get('[data-test=password-input] > .native-input').type('password');
    cy.get('tja-sign-in-page form').should('have.class', 'ng-valid');
    cy.get('tja-sign-in-page [data-test=sign-in-button]').should(
      'not.have.attr',
      'disabled'
    );
  });

  it('should redirect to `home` on successful sign in', () => {
    cy.get('[data-test=email-input] > .native-input').type('a.a@a.com');
    cy.get('[data-test=password-input] > .native-input').type('password');
    cy.get('tja-sign-in-page [data-test=sign-in-button]').click();
    cy.url().should('include', '/home');
  });
});

/*
describe('describe-1', () => {
  beforeEach(() => {
    navigateTo();  
  });
  
  it('should display menu title, Menu', () => {
    // cy.pause();
    getMenuTitle().contains('Menu');
    cy.visit('http://localhost:4200/list');
    cy.url().should('include', '/list')
  });  
});

describe('describe-2', () => {
  beforeEach(() => {
    navigateTo();  
  });
  
  it('should display menu title, Menu', () => {
    // cy.pause();    
    getMenuTitle().contains('Menu');
  });  
});
*/
