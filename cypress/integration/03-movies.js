/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Movies Page', () => {
  beforeEach(() => {
    cy.visit('/movies');
  });

  context('Desktop', () => {
    context('Content', () => {
      it('should display the cards', () => {
        cy.get('#card-0 > .w-75').should('have.attr', 'src').and('contain', 'movie1.png');
        cy.get('#card-0 > .px-4 > .font-bold > .text-xs').contains('21/07/2023');
        cy.get('#card-0 > .px-4 > .font-bold > .text-xl').contains('Movie1');
        cy.get('#card-0 .hover\\:text-gray-100').should('have.attr', 'href', 'http://movie1.com/download');
        cy.get('#card-0 p').contains('Pass: ABC');
        cy.get('#card-0 .w-16').should('have.attr', 'href', 'http://image1.com');

        cy.get('#card-1 > .w-75').should('have.attr', 'src').and('contain', 'movie2.png');
        cy.get('#card-1 > .px-4 > .font-bold > .text-xs').contains('23/07/2023');
        cy.get('#card-1 > .px-4 > .font-bold > .text-xl').contains('Movie2');
        cy.get('#card-1 .hover\\:text-gray-100').should('not.exist');
        cy.get('#card-1 p').should('not.exist');
        cy.get('#card-1 .w-16').should('not.exist');
      });
    });
  });

  context('Mobile', () => {
    beforeEach(() => {
      cy.viewport('iphone-xr');
    });

    context('Content', () => {
      it('should display the cards', () => {
        cy.get('#card-0 > .w-75').should('have.attr', 'src').and('contain', 'movie1.png');
        cy.get('#card-0 > .px-4 > .font-bold > .text-xs').contains('21/07/2023');
        cy.get('#card-0 > .px-4 > .font-bold > .text-xl').contains('Movie1');
        cy.get('#card-0 .hover\\:text-gray-100').should('have.attr', 'href', 'http://movie1.com/download');
        cy.get('#card-0 p').contains('Pass: ABC');
        cy.get('#card-0 .w-16').should('have.attr', 'href', 'http://image1.com');

        cy.get('#card-1 > .w-75').should('have.attr', 'src').and('contain', 'movie2.png');
        cy.get('#card-1 > .px-4 > .font-bold > .text-xs').contains('23/07/2023');
        cy.get('#card-1 > .px-4 > .font-bold > .text-xl').contains('Movie2');
        cy.get('#card-1 .hover\\:text-gray-100').should('not.exist');
        cy.get('#card-1 p').should('not.exist');
        cy.get('#card-1 .w-16').should('not.exist');
      });
    });
  });
});
