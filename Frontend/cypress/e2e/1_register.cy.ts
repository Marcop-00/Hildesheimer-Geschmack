describe('User Registration', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('should display validation errors when required fields are empty', () => {
    cy.get('.submit').should('be.disabled');

    cy.get('input[name="name"]').click().blur();
    cy.get('.error-message').should('contain', 'Name required');

    cy.get('input[name="email"]').click().blur();
    cy.get('.error-message').should('contain', 'Valid email required');

    cy.get('input[name="password"]').click().blur();
    cy.get('.error-message').should('contain', 'Password minimum length 6 characters');

    cy.get('input[name="confirmPassword"]').click().blur();
    cy.get('.error-message').should('contain', 'Confirm password required');
  });

  it('should allow selecting user type', () => {
    cy.get('input[name="userType"][value="customer"]').check().should('be.checked');
    cy.get('input[name="userType"][value="owner"]').check().should('be.checked');
  });

  it('should show error if passwords do not match', () => {
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password456');
    cy.get('input[name="password"]').click();
    cy.get('.error-message').should('contain', 'Passwords do not match');
  });

  it('should allow toggling password visibility', () => {
    cy.get('input[name="password"]').type('password123');
    cy.contains('👁️‍🗨️').click(); // Show password
    cy.get('input[name="password"]').should('have.attr', 'type', 'text');

    cy.contains('👁️').click(); // Hide password
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
  });

  it('should successfully register and redirect to login page', () => {
    cy.intercept('POST', 'http://localhost:3000/api/users/register', {
      statusCode: 201,
      body: { message: 'User registered successfully' },
    }).as('registerRequest');

    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password123');
    cy.get('input[name="userType"][value="customer"]').check();
    cy.get('.submit').click();
    cy.url().should('include', '/login');
  });

  it('should show an error message for registration failure', () => {
    cy.intercept('POST', 'http://localhost:3000/api/users/register', {
      statusCode: 400,
      body: { message: 'Email already exists' },
    }).as('registerRequest');

    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password123');
    cy.get('input[name="userType"][value="customer"]').check();
    cy.get('.submit').click();
    cy.get('.error-message').should('contain', 'Email already exists');
  });

  it('should navigate back to home page', () => {
    cy.get('.back-btn').click();
    cy.url().should('include', '/');
  });

  it('should navigate to login page', () => {
    cy.contains('Login').click();
    cy.url().should('include', '/login');
  });
});
