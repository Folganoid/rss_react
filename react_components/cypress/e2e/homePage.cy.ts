describe('describe the home page', () => {
  const BASE_URL = 'http://localhost:3000';

  it('home page searching works correctly', () => {
    cy.visit(BASE_URL);
    cy.get('main').find('article').should('have.length', 20);
    cy.get('input').type('tt\n');
    cy.get('main').find('article').should('have.length', 19);
    cy.get('select').find('option').should('have.length', 1);
    cy.get('input').should('have.value', 'tt');
    cy.get('button').click();
    cy.get('input').should('have.value', '');
    cy.get('main').find('article').should('have.length', 20);
    cy.get('select').find('option').should('have.length', 42);
    cy.get('input').type('ll\n');
    cy.get('select').select('2');
    cy.get('main').find('article').should('have.length', 1);
    cy.get('input').type('llll\n');
    cy.get('main').find('article').should('have.length', 0);
  });

  it('home page modal window works correctly', () => {
    cy.visit(BASE_URL);
    cy.get('main').within(() => {
      cy.contains('status:').should('not.exist');
      cy.contains('URL:').should('not.exist');
      cy.contains('Type:').should('not.exist');
    });
    cy.contains('Rick Sanchez').parent().find('div').click();
    cy.get('main').within(() => {
      cy.contains('status:').should('exist');
      cy.contains('URL:').should('exist');
      cy.contains('Type:').should('exist');
    });
    cy.get('article button').click();
    cy.contains('status:').should('not.exist');
    cy.contains('URL:').should('not.exist');
    cy.contains('Type:').should('not.exist');
  });
});
