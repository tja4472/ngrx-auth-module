import { getMenuTitle, navigateTo } from '../support/po';

describe('describe-0', () => {
  beforeEach(() => {
    // Remove Firebase autologin.
    indexedDB.deleteDatabase('firebaseLocalStorageDb');
    navigateTo();  
  });

  it('should display menu title, Menu', () => {
    getMenuTitle().contains('Menu');
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
          cy.url().should('include', '/home')
  });
  */

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
