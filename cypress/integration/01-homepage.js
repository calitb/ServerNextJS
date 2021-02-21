/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  context('Desktop', () => {
    context('Content', () => {
      it('should display the title', () => {
        cy.get('#title').should('contain', 'calitb.dev');
      });

      it('should display the message', () => {
        cy.get('#message').should('contain', 'This page is under construction');
      });

      it('should display links as not selected', () => {
        cy.get('#link-Repositories').should('have.css', 'color', 'rgb(209, 213, 219)');
        cy.get('#link-Repositories').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
      });
    });

    context('Navigation', () => {
      it('should redirect to the repositories page', () => {
        cy.get('#link-Repositories').click().url().should('contain', '/repositories');
      });

      it('should redirect to the homepage', () => {
        cy.get('#link-Repositories').click().url().should('contain', '/repositories');
        cy.get('#link-home')
          .click()
          .url()
          .should('eq', Cypress.config().baseUrl + '/');
      });

      it('should redirect to the github page', () => {
        cy.get('#link-github').should('have.attr', 'href', 'https://github.com/calitb').should('have.attr', 'target', '_blank');
        cy.request('https://github.com/calitb').its('status').should('eq', 200);
      });
    });
  });

  context('Mobile', () => {
    beforeEach(() => {
      cy.viewport('iphone-xr');
    });

    context('Content', () => {
      it('should display the title', () => {
        cy.get('#title').should('contain', 'calitb.dev');
      });

      it('should display the message', () => {
        cy.get('#message').should('contain', 'This page is under construction');
      });

      it('should display links as not selected', () => {
        cy.get('#mobile-menu-icon-open').click();
        cy.get('#mlink-Repositories').should('have.css', 'color', 'rgb(209, 213, 219)');
        cy.get('#mlink-Repositories').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
      });
    });

    context('Menu', () => {
      it('should open and close the menu', () => {
        cy.get('#mobile-menu-icon-close').should('have.css', 'display', 'none');
        cy.get('#mobile-menu-icon-open').should('have.css', 'display', 'block');
        cy.get('#mobile-menu-icon-open').click();
        cy.get('#mobile-menu-icon-open').should('have.css', 'display', 'none');
        cy.get('#mobile-menu-icon-close').should('have.css', 'display', 'block');
        cy.get('#mobile-menu-icon-close').click();
        cy.get('#mobile-menu-icon-close').should('have.css', 'display', 'none');
        cy.get('#mobile-menu-icon-open').should('have.css', 'display', 'block');
      });
    });

    context('Navigation', () => {
      it('should redirect to the repositories page', () => {
        cy.get('#mobile-menu-icon-open').click();
        cy.get('#mlink-Repositories').click().url().should('contain', '/repositories');
      });

      it('should redirect to the homepage', () => {
        cy.get('#mobile-menu-icon-open').click();
        cy.get('#mlink-Repositories').click().url().should('contain', '/repositories');
        cy.get('#link-home')
          .click()
          .url()
          .should('eq', Cypress.config().baseUrl + '/');
      });

      it('should redirect to the github page', () => {
        cy.get('#link-github').should('have.attr', 'href', 'https://github.com/calitb').should('have.attr', 'target', '_blank');
        cy.request('https://github.com/calitb').its('status').should('eq', 200);
      });
    });
  });
});
