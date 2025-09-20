describe('HomepageComponent', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the homepage and display elements', () => {
    cy.get('app-navbar').should('exist');
    cy.get('.search-bar input').should('exist');
    cy.get('.search-bar button').should('exist');
    cy.get('select').should('exist');
    cy.get('app-footer').should('exist');
  });

  it('should allow searching for a restaurant', () => {
    cy.get('.search-bar input').type('Pasta Paradise');
    cy.get('.search-bar button').click();
    cy.get('app-restaurant-card').should('exist');
  });

  it('should allow filtering restaurants', () => {
    cy.get('select').select('mostFavorited');
    cy.get('app-restaurant-card').should('exist');
  });

  it('should display a message when no restaurants match the search', () => {
    cy.get('.search-bar input').type('Nonexistent Restaurant');
    cy.get('.search-bar button').click();
    cy.get('.no-results').should('contain', 'No restaurants found. Try a different search.');
  });

  it('should toggle language when language button is clicked', () => {
    cy.get('.lang-btn').click();
    cy.get('.lang-btn').should('contain.text', 'EN');
    cy.get('.lang-btn').click();
    cy.get('.lang-btn').should('contain.text', 'DE');
  });
});
