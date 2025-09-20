describe('Profile Page Tests as Customer', () => {
  beforeEach(() => {
    cy.visit('/login');

    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('.submit').click();

    cy.wait(1000);

    cy.visit('/profile');
  });

  it('should display user details', () => {
    cy.get('.profile-card h2').should('not.be.empty');
    cy.get('.profile-card p').should('contain', 'Email');
  });


  it('should update user account details', () => {
    cy.get('input[name="name"]').clear().type('Updated Name');
    cy.get('input[name="email"]').clear().type('updated@example.com');
    cy.get('button.update-button').click();
    cy.get('input[name="name"]').clear().type('Test User');
    cy.get('input[name="email"]').clear().type('test@example.com');
    cy.get('button.update-button').click();
  });

});
