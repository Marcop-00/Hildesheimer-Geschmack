describe('FeedbackComponent', () => {
  beforeEach(() => {
    cy.visit('/feedback');
  });
  it('should allow submitting feedback with confirmation', () => {
    cy.get('.feedback-container textarea').type('Great service!');
    cy.get('.feedback-container button[type="submit"]').click();
    cy.get('.mat-dialog-container', { timeout: 10000 }).should('be.visible');
    cy.contains('Are you sure you want to submit your feedback?');
    cy.get('.confirm-button').contains('Confirm').click();
    cy.get('.feedback-container textarea').should('have.value', '');
  });
  it('should allow cancel feedback with confirmation', () => {
    cy.get('.feedback-container textarea').type('Gereat service!');
    cy.get('.feedback-container button[type="submit"]').click();
    cy.get('.mat-dialog-container', { timeout: 10000 }).should('be.visible');
    cy.contains('Are you sure you want to submit your feedback?');
    cy.get('.cancel-button').contains('Cancel').click();
  });
});
