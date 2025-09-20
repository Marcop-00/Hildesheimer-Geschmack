describe('Restaurant Details Page', () => {
  beforeEach(() => {
    cy.visit('/login');

    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('.submit').click();

    cy.wait(1000);

    cy.intercept('GET', '/api/restaurants/3')

    cy.visit('/restaurant/3');

    cy.wait(1000);
    cy.get('h2').should('be.visible');
});

  it('should display restaurant details', () => {
    cy.get('p').should('contain', 'Cuisine style:');
  });

  it('should allow users to add a comment', () => {
    cy.get('input[placeholder="Add a comment..."]').type('Great food!');
    cy.get('.add-comment').contains('Submit').click();

    cy.get('.mat-dialog-container', { timeout: 10000 }).should('be.visible');
    cy.contains('Are you sure you want to submit this comment?');
    cy.get('.confirm-button').contains('Confirm').click();

    cy.intercept('POST', '/api/restaurants/3/comments', {
      statusCode: 201,
      body: { content: 'Great food!', user: { name: 'Test User' } },
    }).as('postComment');

    cy.wait('@postComment');
    cy.get('.comment-content').should('contain', 'Great food!');
  });

  it('should allow users to toggle favorite status add', () => {
    cy.intercept('POST', '/api/users/favorites', { statusCode: 200 }).as('toggleFavorite');

    cy.get('.heart-btn').click();
    cy.get('.mat-dialog-container', { timeout: 10000 }).should('be.visible');
    cy.contains('Are you sure you want to add to your favorite restaurants?');
    cy.get('.confirm-button').contains('Confirm').click();
    cy.get('.heart-btn').should('contain', '❤️');
  });

  it('should allow users to toggle favorite status remove', () => {
    cy.intercept('POST', '/api/users/favorites', { statusCode: 200 }).as('toggleFavorite');

    cy.get('.heart-btn').click();
    cy.get('.mat-dialog-container', { timeout: 10000 }).should('be.visible');
    cy.contains('Are you sure you want to remove from your favorite restaurants?');
    cy.get('.confirm-button').contains('Confirm').click();
    cy.get('.heart-btn').should('contain', '❤️');
  });

});
