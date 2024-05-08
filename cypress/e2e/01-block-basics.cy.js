import { slateBeforeEach, slateAfterEach } from '../support/e2e';

describe('Blocks Tests', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('Add Block: Empty', () => {
    // Change page title
    cy.clearSlateTitle();
    cy.getSlateTitle().type('My Add-on Page');
    cy.get('.documentFirstHeading').contains('My Add-on Page');
    cy.getSlate().click();

    // Add block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Media').click();
    cy.get('.content.active.media .button.image').contains('Image').click();

    // Save
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/cypress/my-page');

    // then the page view should contain our changes
    cy.contains('My Add-on Page');
    cy.get('.block.image');
  });

  it('Add Hero Block', () => {
    // Change page title
    cy.clearSlateTitle();
    cy.getSlateTitle().type('My Add-on Page');
    cy.get('.documentFirstHeading').contains('My Add-on Page');
    cy.getSlate().click();

    // Add block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.hero')
      .contains('Hero')
      .click({ force: true });

    // Configure block
    cy.getSlate().click().type('Hero Block');

    // Save
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/cypress/my-page');

    // then the page view should contain our changes
    cy.contains('My Add-on Page');
    cy.get('.hero-block');
  });
});
