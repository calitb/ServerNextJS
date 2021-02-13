describe('Repositories Page', () => {
  beforeEach(() => {
    cy.visit('/repositories');
  });

  context('Desktop', () => {
    context('Content', () => {
      it('should display the link as selected', () => {
        cy.get('#link-Repositories').should('have.css', 'color', 'rgb(255, 255, 255)');
        cy.get('#link-Repositories').should('have.css', 'background-color', 'rgb(17, 24, 39)');
      });

      it('should display the right amount of cards', () => {
        cy.get('main').children().should('have.length', 12);
      });

      it('should display the right content in the card', () => {
        cy.get('#card-0 > .w-full > .justify-between > :nth-child(1) > #summary > #name').should('contain', 'GithubWorkflow');
        cy.get('#card-1 > .w-full > .justify-between > :nth-child(1) > #summary > #description').should('contain', 'Sample of ReactNative app fetching graphql');

        cy.get('#card-2 > .w-full > .justify-between > :nth-child(1) > #techs > #tech-0').should('contain', 'graphql-server');
        cy.get('#card-2 > .w-full > .justify-between > :nth-child(1) > #techs > #tech-1').should('contain', 'apollographql');
        cy.get('#card-2 > .w-full > .justify-between > :nth-child(1) > #techs > #tech-2').should('contain', 'nodejs');

        cy.get('#card-3 > .w-full > .justify-between > :nth-child(2) > #button > a').should('have.attr', 'href', 'https://github.com/calitb/Sample-NextJS').should('have.attr', 'target', '_blank');
      });
    });

    context('Navigation', () => {
      it('should navigate to the specific repo', () => {
        cy.get('#card-3 > .w-full > .justify-between > :nth-child(2) > #button > a').should('have.attr', 'href', 'https://github.com/calitb/Sample-NextJS').should('have.attr', 'target', '_blank');
        cy.request('https://github.com/calitb/Sample-NextJS').its('status').should('eq', 200);
      });
    });
  });

  context('Mobile', () => {
    beforeEach(() => {
      cy.viewport('iphone-xr');
    });

    context('Content', () => {
      it('should display the link as selected', () => {
        cy.get('#link-Repositories').should('have.css', 'color', 'rgb(255, 255, 255)');
        cy.get('#link-Repositories').should('have.css', 'background-color', 'rgb(17, 24, 39)');
      });

      it('should display the right amount of cards', () => {
        cy.get('main').children().should('have.length', 12);
      });

      it('should display the right content in the card', () => {
        cy.get('#card-0 > .w-full > .justify-between > :nth-child(1) > #summary > #name').should('contain', 'GithubWorkflow');
        cy.get('#card-1 > .w-full > .justify-between > :nth-child(1) > #summary > #description').should('contain', 'Sample of ReactNative app fetching graphql');

        cy.get('#card-2 > .w-full > .justify-between > :nth-child(1) > #techs > #tech-0').should('contain', 'graphql-server');
        cy.get('#card-2 > .w-full > .justify-between > :nth-child(1) > #techs > #tech-1').should('contain', 'apollographql');
        cy.get('#card-2 > .w-full > .justify-between > :nth-child(1) > #techs > #tech-2').should('contain', 'nodejs');

        cy.get('#card-3 > .w-full > .justify-between > :nth-child(2) > #button > a').should('have.attr', 'href', 'https://github.com/calitb/Sample-NextJS').should('have.attr', 'target', '_blank');
      });
    });

    context('Navigation', () => {
      it('should navigate to the specific repo', () => {
        cy.get('#card-3 > .w-full > .justify-between > :nth-child(2) > #button > a').should('have.attr', 'href', 'https://github.com/calitb/Sample-NextJS').should('have.attr', 'target', '_blank');
        cy.request('https://github.com/calitb/Sample-NextJS').its('status').should('eq', 200);
      });
    });
  });
});
