describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display validation errors when fields are empty', () => {
    cy.get('.submit').should('be.disabled');

    cy.get('input[name="email"]').click().blur();
    cy.get('.error-message').should('contain', 'Valid email is required.');

    cy.get('input[name="password"]').click().blur();
    cy.get('.error-message').should('contain', 'Password must be at least 6 characters long.');
  });

  it('should allow typing into email and password fields', () => {
    cy.get('input[name="email"]').type('test@example.com').should('have.value', 'test@example.com');
    cy.get('input[name="password"]').type('password123').should('have.value', 'password123');
  });

  it('should toggle password visibility', () => {
    cy.get('input[name="password"]').type('password123');
    cy.contains('Show Password').click();
    cy.get('input[name="password"]').should('have.attr', 'type', 'text');

    cy.contains('Hide Password').click();
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
  });

  it('should show error for invalid credentials', () => {
    cy.intercept('POST', 'http://localhost:3000/api/users/login', {
      statusCode: 401,
      body: { message: 'Invalid email or password.' },
    }).as('loginRequest');

    cy.get('input[name="email"]').type('wrong@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('.submit').click();

    cy.wait('@loginRequest');
    cy.get('.error-message').should('contain', 'Invalid email or password.');
  });

  it('should login successfully and redirect to home', () => {
    cy.intercept('POST', 'http://localhost:3000/api/users/login', {
      statusCode: 200,
      body: { token: 'fake-jwt-token', user: { email: 'test@example.com' } },
    }).as('loginRequest');

    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('.submit').click();

    cy.wait('@loginRequest');
  });

  it('should navigate to the register page', () => {
    cy.contains('Register').click();
    cy.url().should('include', '/register');
  });

  it('should navigate back to home page', () => {
    cy.get('.back-btn').click();
  });
});
