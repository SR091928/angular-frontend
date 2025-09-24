describe('Hello World Page', () => {
  it('should display Hello World', () => {
    cy.visit('/');
    cy.contains('Hello World');
  });
});
