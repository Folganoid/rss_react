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

  it('renders form page correctly', () => {
    cy.visit(BASE_URL + '/form');
    cy.get('header').should('exist');
    cy.get('main').should('exist');
    cy.get('h1').should('exist');
    cy.get('h1').contains('Form page');
    cy.get('footer').should('exist');
  });

  it('renders about page correctly', () => {
    cy.visit(BASE_URL + '/about');
    cy.get('header').should('exist');
    cy.get('main').should('exist');
    cy.get('h1').should('exist');
    cy.get('h1').contains('About page');
    cy.get('footer').should('exist');
  });

  it('renders 404 page correctly', () => {
    cy.visit(BASE_URL + '/errorlkjkljlkjlkj');
    cy.get('header').should('exist');
    cy.get('main').should('exist');
    cy.get('h1').should('exist');
    cy.get('h1').contains('404 error: page not found...');
    cy.get('footer').should('exist');
  });

  it('routers work correctly', () => {
    cy.visit(BASE_URL);
    cy.get('h1').contains('Home page');
    cy.get('a[href="/about"]').click();
    cy.get('h1').contains('About page');
    cy.get('a[href="/form"]').click();
    cy.get('h1').contains('Form page');
  });
});
