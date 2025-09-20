describe('Profile Page Tests as Owner', () => {
  beforeEach(() => {
    cy.visit('/login');

    cy.get('input[name="email"]').type('jane.smith@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('.submit').click();

    cy.wait(1000);

    cy.visit('/profile');
    cy.wait(1000);
  });

  it('should display user details', () => {
    cy.get('.profile-card h2').should('not.be.empty');
    cy.get('.profile-card p').should('contain', 'Email');
  });


  it('should view restaurant analytics', () => {
    cy.get('.analytics-button').click();
    cy.get('h3').should('not.be.empty');
  });

  it('should view restaurant analytics', () => {
    cy.get('.update-restaurant-button').click();
    cy.get('h3').should('not.be.empty');
  });

  it('should not delete the restaurant', () => {
    cy.get('.delete-restaurant-button').click();
    cy.get('.mat-dialog-container', { timeout: 10000 }).should('be.visible');
    cy.contains('Are you sure you want to delete this restaurant?');
    cy.get('.cancel-button').contains('Cancel').click();
  });

  it('should delete the restaurant', () => {
    cy.get('.delete-restaurant-button').click();
    cy.get('.mat-dialog-container', { timeout: 10000 }).should('be.visible');
    cy.contains('Are you sure you want to delete this restaurant?');
    cy.get('.confirm-button').contains('Confirm').click();
  });

});
