export class CheckoutPage {    
    elements = {
        proceedButton: () => cy.contains('button', 'Proceed to checkout'),
        cartQuantity: () => cy.get('[data-test="cart-quantity"]'),
    }    
    verifyPageDetails() {
        cy.url().should('include', '/checkout');
        this.elements.proceedButton().should('be.visible');
    }
}
