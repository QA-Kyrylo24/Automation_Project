export class ProductPage {    
    elements = {
        buttonCart: () => cy.get('button').contains('Add to cart'),
        productName: () => cy.get('[data-test="product-name"]'),
        price: () => cy.get('[aria-label="unit-price"]'),
        alert: () => cy.get('[role="alert"]'),
        quantity: () => cy.get('#quantity-input'),
        cartIcon: () => cy.get('[data-test="nav-cart"]')
    }    
    verifyPageDetails() {
        cy.url().should('match', /^https:\/\/practicesoftwaretesting\.com\/product/);
        this.elements.buttonCart().should('be.visible');
    }    
    
    verifyAlert() {
        this.elements.alert()
            .should('be.visible')
            .and('contain', 'Product added to shopping cart');

        cy.get('[role="alert"]', { timeout: 10000 }).should('not.exist');
    }

    verifyProductQuantity(quantity: string) {
        this.elements.quantity().should('have.value', quantity);
    }

    addToCart() {
        this.elements.buttonCart().click();
    }  

    navigateToCart() {
        this.elements.cartIcon().click({ force: true });
    }
}
