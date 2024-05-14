describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000');
    cy.get('.board-row').should('have.length', 3);

    cy.get('.square').each(($square) => {
      expect($square.text()).to.equal('')
    });

  })
  it('should allow a player to make a move and update the board', () => {
    cy.visit('http://localhost:3000');

    cy.get('.square').first().click(); 

    cy.get('.square').first().should('have.text', 'X'); 

    cy.get('.status').should('contain', 'Next player: O'); 
  });

  it('should not allow a player to make a move on a filled square', () => {
    cy.visit('http://localhost:3000');

    cy.get('.square').first().click(); 

    cy.get('.square').first().click(); 

    cy.get('.status').should('be.visible'); 

    cy.get('.status').should('contain', 'Next player: O');
  });

  it('should declare a winner when a row is filled', () => {
    cy.visit('http://localhost:3000');

    
    cy.get('.square').eq(0).click(); 
    cy.get('.square').eq(6).click(); 
    cy.get('.square').eq(1).click(); 
    cy.get('.square').eq(8).click(); 
    cy.get('.square').eq(2).click(); 

    cy.get('.status').should('contain', 'Winner: X'); 
  });

  it('should allow jumping to previous moves using the move history', () => {
    cy.visit('http://localhost:3000');

    
    cy.get('.square').eq(0).click(); 
    cy.get('.square').eq(4).click(); 
    cy.get('.square').eq(1).click(); 

  
    cy.get('.game-info button').contains('Go to move #1').click();
    cy.get('.square').eq(0).should('have.text', 'X'); 


    cy.get('.square').eq(1).should('have.text', ''); 
    cy.get('.square').eq(4).should('not.have.text', 'O'); 
    cy.get('.status').should('contain', 'Next player: O'); 


    cy.get('.game-info ol li').first().click();
    cy.get('.square').eq(0).should('be.empty'); 

  });
  
})