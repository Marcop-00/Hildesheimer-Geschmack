describe('Create Restaurant Form', () => {
  beforeEach(() => {
    cy.visit('/create-restaurant');
  });

  it('should fill out and submit the form successfully', () => {
    cy.get('#name').type('Test Restaurant');
    cy.get('#cuisine-type').select('ITALIAN');
    cy.get('#description').type('A great Italian place');
    cy.get('#address').type('123 Cypress Lane');
    cy.get('#phone').type('123456789');
    cy.get('#website').type('http://testrestaurant.com');
    cy.get('#workingHour').type('9:00 AM - 9:00 PM');

    cy.get('[name="glutenFree"]').check();
    cy.get('[name="lactoseFree"]').check();

    cy.get('.submit-create-restaurant-button').click();
    cy.get('.mat-dialog-container', { timeout: 10000 }).should('be.visible');
    cy.contains('Are you sure you want to create this restaurant?');
    cy.get('.confirm-button').contains('Confirm').click();
  });

  it('should validate required fields', () => {
    cy.get('.submit-create-restaurant-button').should('be.disabled');

    cy.get('#name').type('Test Restaurant');
    cy.get('#cuisine-type').select('MEXICAN');
    cy.get('#description').type('A spicy Mexican place');
    cy.get('#address').type('456 Cypress Ave');
    cy.get('#phone').type('987654321');
    cy.get('#website').type('http://mexicanplace.com');
    cy.get('#workingHour').type('10:00 AM - 10:00 PM');

    cy.get('.submit-create-restaurant-button').should('not.be.disabled');
  });
});
