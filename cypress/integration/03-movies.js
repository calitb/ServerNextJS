/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Movies Page', () => {
  beforeEach(() => {
    cy.visit('/movies');
  });

  context('Desktop', () => {
    context('Content', () => {
      it('should display the cards', () => {
        cy.get('[data-cy=nextmovies] > .flex-wrap > #card-0 > [data-cy=image]').should('have.attr', 'src').and('contain', 'movie1.png');
        // cy.get('[data-cy=nextmovies] > .flex-wrap #card-0 > .px-4 > .font-bold > [data-cy=date]').contains('viernes, 21 de jul. de 2023 - 07:00 a. m.');
        cy.get('[data-cy=nextmovies] > .flex-wrap #card-0 > .px-4 > .font-bold > [data-cy=name]').contains('Movie1');
        cy.get('[data-cy=nextmovies] > .flex-wrap #card-0 .hover\\:text-gray-100').should('have.attr', 'href', 'http://movie1.com/download');
        cy.get('[data-cy=nextmovies] > .flex-wrap #card-0 p').contains('Pass: ABC');
        cy.get('[data-cy=nextmovies] > .flex-wrap #card-0 .w-16').should('have.attr', 'href', 'http://movie1.com');

        cy.get('[data-cy=futuremovies] > .flex-wrap > #card-0 > [data-cy=image]').should('have.attr', 'src').and('contain', 'movie2.png');
        cy.get('[data-cy=futuremovies] > .flex-wrap #card-0 > .px-4 > .font-bold > [data-cy=date]').contains('viernes, 21 de jul. de 2023 - 07:00 a. m.');
        cy.get('[data-cy=futuremovies] > .flex-wrap #card-0 > .px-4 > .font-bold > [data-cy=name]').contains('Movie2');
        cy.get('[data-cy=futuremovies] > .flex-wrap #card-0 .hover\\:text-gray-100').should('have.attr', 'href', 'http://movie2.com/download');
        cy.get('[data-cy=futuremovies] > .flex-wrap #card-0 p').contains('Pass: ABC');
        cy.get('[data-cy=futuremovies] > .flex-wrap #card-0 .w-16').should('have.attr', 'href', 'http://movie2.com');

        cy.get('[data-cy=futuremovies] > .flex-wrap #card-1 > [data-cy=image]').should('have.attr', 'src').and('contain', 'movie3.png');
        cy.get('[data-cy=futuremovies] > .flex-wrap #card-1 > .px-4 > .font-bold > [data-cy=date]').contains('domingo, 23 de jul. de 2023 - 07:00 a. m.');
        cy.get('[data-cy=futuremovies] > .flex-wrap #card-1 > .px-4 > .font-bold > [data-cy=name]').contains('Movie3');
        cy.get('[data-cy=futuremovies] > .flex-wrap #card-1 .hover\\:text-gray-100').should('not.exist');
        cy.get('[data-cy=futuremovies] > .flex-wrap #card-1 p').should('not.exist');
        cy.get('[data-cy=futuremovies] > .flex-wrap #card-1 .w-16').should('not.exist');
      });
    });
  });

  context('Mobile', () => {
    beforeEach(() => {
      cy.viewport('iphone-xr');
    });

    context('Content', () => {
      it('should display the cards', () => {
        cy.get('[data-cy=nextmovies] > .flex-wrap > #card-0 > [data-cy=image]').should('have.attr', 'src').and('contain', 'movie1.png');
        // cy.get('[data-cy=nextmovies] > .flex-wrap #card-0 > .px-4 > .font-bold > [data-cy=date]').contains('viernes, 21 de jul. de 2023 - 07:00 a. m.');
        cy.get('[data-cy=nextmovies] > .flex-wrap #card-0 > .px-4 > .font-bold > [data-cy=name]').contains('Movie1');
        cy.get('[data-cy=nextmovies] > .flex-wrap #card-0 .hover\\:text-gray-100').should('have.attr', 'href', 'http://movie1.com/download');
        cy.get('[data-cy=nextmovies] > .flex-wrap #card-0 p').contains('Pass: ABC');
        cy.get('[data-cy=nextmovies] > .flex-wrap #card-0 .w-16').should('have.attr', 'href', 'http://movie1.com');

        cy.get('[data-cy=futuremovies] > .flex-wrap #card-0 > [data-cy=image]').should('have.attr', 'src').and('contain', 'movie2.png');
        cy.get('[data-cy=futuremovies] > .flex-wrap #card-0 > .px-4 > .font-bold > [data-cy=date]').contains('viernes, 21 de jul. de 2023 - 07:00 a. m.');
        cy.get('[data-cy=futuremovies] > .flex-wrap #card-0 > .px-4 > .font-bold > [data-cy=name]').contains('Movie2');
        cy.get('[data-cy=futuremovies] > .flex-wrap #card-0 .hover\\:text-gray-100').should('have.attr', 'href', 'http://movie2.com/download');
        cy.get('[data-cy=futuremovies] > .flex-wrap #card-0 p').contains('Pass: ABC');
        cy.get('[data-cy=futuremovies] > .flex-wrap #card-0 .w-16').should('have.attr', 'href', 'http://movie2.com');

        cy.get('[data-cy=futuremovies] > .flex-wrap #card-1 > [data-cy=image]').should('have.attr', 'src').and('contain', 'movie3.png');
        cy.get('[data-cy=futuremovies] > .flex-wrap #card-1 > .px-4 > .font-bold > [data-cy=date]').contains('domingo, 23 de jul. de 2023 - 07:00 a. m.');
        cy.get('[data-cy=futuremovies] > .flex-wrap #card-1 > .px-4 > .font-bold > [data-cy=name]').contains('Movie3');
        cy.get('[data-cy=futuremovies] > .flex-wrap #card-1 .hover\\:text-gray-100').should('not.exist');
        cy.get('[data-cy=futuremovies] > .flex-wrap #card-1 p').should('not.exist');
        cy.get('[data-cy=futuremovies] > .flex-wrap #card-1 .w-16').should('not.exist');
      });
    });
  });
});
