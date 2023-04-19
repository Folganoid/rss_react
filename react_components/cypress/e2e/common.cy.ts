describe('describe the home page', () => {
  const BASE_URL = 'http://localhost:5173';

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

  it('form page button submit disabled and enabled', () => {
    cy.visit(BASE_URL + '/form');
    cy.get('form').should('exist');

    cy.get('input[name="name"]').type('ll');
    cy.get('textarea[name="desc"]').type('ll');
    cy.get('input[name="site"]').type('ll');
    cy.get('input[name="lDate"]').type('2023-03-29');
    cy.get('button[type="submit"]').should('not.be.disabled');
    cy.contains('p', 'Must be 3-20 characters...').should('not.be.visible');
    cy.contains('p', 'Must be in .PNG / .JPG / .JPEG / .SVG / .GIF format').should(
      'not.be.visible'
    );
    cy.contains('p', 'Must be at least 10 characters').should('not.be.visible');
    cy.contains('p', 'Must be filled no later than 2022-12-31').should('not.be.visible');
    cy.contains('p', 'At least one item must be selected').should('not.be.visible');
    cy.contains('p', 'Must be in http(s)://xxx.xx(x) format').should('not.be.visible');

    cy.get('button[type="submit"]').click();
    cy.get('button[type="submit"]').should('be.disabled');
    cy.contains('p', 'Must be 3-20 characters...').should('be.visible');
    cy.contains('p', 'Must be in .PNG / .JPG / .JPEG / .SVG / .GIF format').should('be.visible');
    cy.contains('p', 'Must be at least 10 characters').should('be.visible');
    cy.contains('p', 'Must be filled no later than 2022-12-31').should('be.visible');
    cy.contains('p', 'At least one item must be selected').should('be.visible');
    cy.contains('p', 'Must be in http(s)://xxx.xx(x) format').should('be.visible');
  });

  it('form page button submit disabled and enabled', () => {
    cy.visit(BASE_URL + '/form');
    cy.get('form').should('exist');

    cy.get('input[name="name"]').type('ll');
    cy.get('textarea[name="desc"]').type('ll');
    cy.get('input[name="site"]').type('ll');
    cy.get('input[name="lDate"]').type('2023-03-29');

    cy.get('input[name="name"]').should('have.value', 'll');
    cy.get('textarea[name="desc"]').should('have.value', 'll');
    cy.get('input[name="site"]').should('have.value', 'll');
    cy.get('input[name="lDate"]').should('have.value', '2023-03-29');

    cy.get('#resetBtn').click();

    cy.get('input[name="name"]').should('have.value', '');
    cy.get('textarea[name="desc"]').should('have.value', '');
    cy.get('input[name="site"]').should('have.value', '');
    cy.get('input[name="lDate"]').should('have.value', '');
  });

  it('form page create card', () => {
    cy.visit(BASE_URL + '/form');

    cy.get('main').find('article').should('have.length', 0);
    cy.get('input[name="name"]').type('lll');
    cy.get('textarea[name="desc"]').type('1234567890');
    cy.get('input[name="site"]').type('https://sfsdf.com');
    cy.get('input[name="lDate"]').type('2000-01-01');
    cy.get('input[value="JS library"]').click();
    cy.get('input[value="WEB framework"]').click();
    cy.get('input[value="false"]').click();

    const filepath = '../../public/images/i_angular.jpg';
    cy.get('input[type="file"]').attachFile(filepath);
    cy.contains('h1', 'Card created successfully!').should('not.be.visible');
    cy.get('button[type="submit"]').click();
    cy.contains('h1', 'Card created successfully!').should('be.visible');

    cy.contains('button', 'Ok').click();
    cy.contains('h1', 'Card created successfully!').should('not.be.visible');
    cy.get('input[name="name"]').should('have.value', '');
    cy.get('textarea[name="desc"]').should('have.value', '');
    cy.get('input[name="site"]').should('have.value', '');
    cy.get('input[name="lDate"]').should('have.value', '');

    cy.contains('h2', 'lll').should('exist');
    cy.contains('b', '2010 - January').should('exist');
    cy.contains('b', 'No').should('exist');
    cy.contains('b', 'JS library, WEB framework').should('exist');
    cy.get('main').find('article').should('have.length', 1);
    cy.get('button[type="submit"]').should('not.be.disabled');
  });
});
