export class LoginPage {
    elements = {
        emailInput: () => cy.get('[data-test="email"]'),
        passwordInput: () => cy.get('[data-test="password"]'),
        loginButton: () => cy.get('[data-test="login-submit"]'),
    }

    visit() {
        cy.visit('auth/login');
    }

    login(email: string, password: string) {
        this.elements.emailInput().type(email);
        this.elements.passwordInput().type(password);
        this.elements.loginButton().click();
    } 

    verifySuccessfulLogin(username: string) {
        cy.get('[data-test="page-title"]').should('have.text', 'My account');
        cy.contains(username).should('be.visible');
    }
}
