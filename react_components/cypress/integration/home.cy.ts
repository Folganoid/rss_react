describe('describe the home page', () => {
  const BASE_URL = 'http://localhost:3000';

  it('renders home page correctly', () => {
    cy.visit(BASE_URL);
    cy.get('header').should('exist');
    cy.get('main').should('exist');
    cy.get('h1').should('exist');
    cy.get('h1').contains('Home page');
    cy.get('footer').should('exist');
  });
});
