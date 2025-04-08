describe('NinjaOne Login Page Tests', () => {
  beforeEach(() => {
    cy.visit('https://app.ninjarmm.com/auth/#/login');
  });

  it('Verifies the page title', () => {
    cy.title().should('include', 'NinjaOne');
  });

  it('Verifies key elements are present', () => {
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"].btn.btn-primary').should('be.visible').and('contain', 'Sign in');
    cy.get('a[href="#/resetPassword"]').should('be.visible').and('contain', 'Forgot your password?');
  });

  // Valid test credentials created manually
  it('Tests successful login with valid credentials', () => {
    cy.get('input[name="email"]').type('junpark.ninjaone@gmail.com');
    cy.get('input[name="password"]').type('ninjaoneTest!');
    cy.get('a[href="#/resetPassword"]').click();

    // Assertion to verify successful login with url change
    cy.url().should('not.include', '/auth/#/login'); 
  });

  it('Tests login with an invalid username', () => {
    cy.get('input[name="email"]').type('invalidusername@gmail.com');
    cy.get('input[name="password"]').type('ninjaoneTest!'); 
    cy.get('button[type="submit"].btn.btn-primary').click();

    // Assert error message is displayed
    cy.get('div.alert.alert-danger')
      .should('be.visible')
      .and('contain', 'contact your system administrator for assistance.');
  });

  it('Tests login with an invalid password', () => {
    cy.get('input[name="email"]').type('junpark.ninjaone@gmail.com');
    cy.get('input[name="password"]').type('invalidpassword'); 
    cy.get('button[type="submit"].btn.btn-primary').click();

    // Assert error message is displayed
    cy.get('div.alert.alert-danger')
      .should('be.visible')
      .and('contain', 'contact your system administrator for assistance.');
  });

  it('Tests login with empty credentials', () => {
    cy.get('button[type="submit"].btn.btn-primary').click();

    // Assert error message is displayed 
    cy.get('div[display="flex"]')
      .should('be.visible')
      .and('contain', 'Error during login');
  });

  it('Tests the "Forgot password?" link navigation', () => {
    cy.get('a').contains('Forgot your password?').click();

    // Assert the browser navigates to the reset password page
    cy.url().should('include', '/auth/#/resetPassword');
  });

  it('Tests the "Do not have an account?" link navigation', () => {
    cy.get('a').contains('Do not have an account?').click();

    // Assert the browser navigates to the registration page
    cy.url().should('include', '/auth/#/register');
  });
});