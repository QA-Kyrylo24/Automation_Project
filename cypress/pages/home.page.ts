export class HomePage {

    visit() {
        cy.visit('/');
    }    
    
    clickOnProduct(productName: string) {
        cy.contains('a', productName).click();
    }
}
