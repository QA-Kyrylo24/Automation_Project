declare global {
    namespace Cypress {
        interface Chainable {
            login: (email: string, password: string) => void;
        }
    }
}

Cypress.Commands.add('login', (email: string, password: string) => {    cy.visit('/auth/login');
    cy.get('[data-test="email"]').type(email);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-submit"]').click();

});
