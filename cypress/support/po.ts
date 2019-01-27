// we could place this url into cypress.json as "baseUrl"
const url = 'http://localhost:4200';

export const navigateTo = () => cy.visit(url);

export const getMenuTitle = () => cy.get('[data-test=menu-title]');
