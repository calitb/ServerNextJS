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

      it('should display the cards', () => {
        cy.get('main').children().its('length').should('be.gte', 0);

        cy.get('main')
          .children()
          .each(($el, index) => {
            cy.get(`#card-${index} > .w-full > .justify-between > :nth-child(1) > #summary > #name`)
              .invoke('text')
              .then((text) => {
                expect(text.length).to.be.at.least(1);
              });

            cy.get(`#card-${index} > .w-full > .justify-between > :nth-child(1) > #summary > #description`)
              .invoke('text')
              .then((text) => {
                expect(text.length).to.be.at.least(1);
              });

            cy.get(`#card-${index} > .w-full > .justify-between > :nth-child(2) > #button > a`).should('have.attr', 'href').and('contain', 'https://github.com/calitb/');
            cy.get(`#card-${index} > .w-full > .justify-between > :nth-child(2) > #button > a`).should('have.attr', 'target', '_blank');

            cy.get(`#card-${index} > .w-full > .justify-between > :nth-child(1) > #techs`)
              .children()
              .each(($el, indexTopic) => {
                cy.get(`#card-${index} > .w-full > .justify-between > :nth-child(1) > #techs > #tech-${indexTopic}`)
                  .invoke('text')
                  .then((text) => {
                    expect(text.length).to.be.at.least(1);
                  });
              });
          });
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

      it('should display the cards', () => {
        cy.get('main').children().its('length').should('be.gte', 0);

        cy.get('main')
          .children()
          .each(($el, index) => {
            cy.get(`#card-${index} > .w-full > .justify-between > :nth-child(1) > #summary > #name`)
              .invoke('text')
              .then((text) => {
                expect(text.length).to.be.at.least(1);
              });

            cy.get(`#card-${index} > .w-full > .justify-between > :nth-child(1) > #summary > #description`)
              .invoke('text')
              .then((text) => {
                expect(text.length).to.be.at.least(1);
              });

            cy.get(`#card-${index} > .w-full > .justify-between > :nth-child(2) > #button > a`).should('have.attr', 'href').and('contain', 'https://github.com/calitb/');
            cy.get(`#card-${index} > .w-full > .justify-between > :nth-child(2) > #button > a`).should('have.attr', 'target', '_blank');

            cy.get(`#card-${index} > .w-full > .justify-between > :nth-child(1) > #techs`)
              .children()
              .each(($el, indexTopic) => {
                cy.get(`#card-${index} > .w-full > .justify-between > :nth-child(1) > #techs > #tech-${indexTopic}`)
                  .invoke('text')
                  .then((text) => {
                    expect(text.length).to.be.at.least(1);
                  });
              });
          });
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
