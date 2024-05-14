describe('Tic Tac Toe Game', () => {
  it('Loads the game correctly', () => {
    cy.visit('http://localhost:3000/');
    cy.contains('Go to game start').should('exist');
  });

  it('Allows a player to make a move', () => {
    cy.get('.square').eq(0).click();
    cy.contains('Next player: O').should('exist');
  });

  // Add more tests as needed
});
