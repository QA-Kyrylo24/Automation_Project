/// <reference types="cypress" />
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';
import { LoginPage } from '../pages/login.page';
import { CheckoutPage } from '../pages/checkout.page';

describe('Basic flow', () => {
    const homePage = new HomePage();
    const productPage = new ProductPage();
    const loginPage = new LoginPage();
    const checkoutPage = new CheckoutPage();

    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('should login with valid credentials', () => {
        loginPage.visit();
        loginPage.login(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'));

        cy.url().should('not.include', '/login');
        loginPage.verifySuccessfulLogin('Jane Doe');
    });    
    
    it('should verify product details', () => {
        homePage.visit();
        homePage.clickOnProduct('Combination Pliers');
        productPage.verifyPageDetails();
        productPage.elements.productName().should('have.text', 'Combination Pliers');
        productPage.elements.price().should('have.text', '14.15');
    });   
    
    it('should verify add product to cart', () => {
        homePage.visit();
        homePage.clickOnProduct('Slip Joint Pliers');
        
        productPage.elements.productName().should('have.text', 'Slip Joint Pliers');
        productPage.elements.price().should('have.text', '9.17');
        productPage.addToCart();
        
        productPage.verifyAlert();
        productPage.verifyProductQuantity('1');
        
        productPage.navigateToCart();        
        checkoutPage.verifyPageDetails();
        cy.contains('Slip Joint Pliers').should('be.visible');
        checkoutPage.elements.cartQuantity().should('have.text', '1');
    });


});

