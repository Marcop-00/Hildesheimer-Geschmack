describe('Profile Page Tests as Owner', () => {
  beforeEach(() => {
    cy.visit('/login');

    cy.get('input[name="email"]').type('admin@example.com');
    cy.get('input[name="password"]').type('adminpassword');
    cy.get('.submit').click();

    cy.wait(1000);

    cy.visit('/profile');
    cy.wait(1000);
  });

  it('should display user details', () => {
    cy.get('.profile-card h2').should('not.be.empty');
    cy.get('.profile-card p').should('contain', 'Email');
  });



  it('should navigate between tabs correctly', () => {
    // Click on Restaurants tab
    cy.get('.nav-tabs li').contains('RESTAURANTS').click();
    cy.get('.section-header h2').should('contain', 'All Restaurants');

    // Click on Users tab
    cy.get('.nav-tabs li').contains('USERS').click();
    cy.get('.section-header h2').should('contain', 'All Users');

    // Click on Feedbacks tab
    cy.get('.nav-tabs li').contains('FEEDBACKS').click();
    cy.get('.section-header h2').should('contain', 'All Feedbacks');
  });

  it('should display a list of restaurants', () => {
    cy.get('.nav-tabs li').contains('RESTAURANTS').click();
    cy.get('.cards-container .card').should('have.length.at.least', 1);
    cy.get('.card-header h3').should('not.be.empty');
  });

  it('should display a list of users', () => {
    cy.get('.nav-tabs li').contains('USERS').click();
    cy.get('.data-table tbody tr').should('have.length.at.least', 1);
    cy.get('.user-info span').should('not.be.empty');
  });

  it('should display a list of feedbacks', () => {
    cy.get('.nav-tabs li').contains('FEEDBACKS').click();
    cy.get('.feedback-container .feedback-card').should('have.length.at.least', 1);
    cy.get('.feedback-body p').should('not.be.empty');
  });


});
