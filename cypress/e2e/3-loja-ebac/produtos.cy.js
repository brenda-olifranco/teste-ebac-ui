/// <reference types="cypress"/>

describe('Funcionalidade: Produtos', () => {

    beforeEach(() => {
        cy.visit('produtos')
    });

    it('Deve selecionar um produto da lista', () => {
        cy.get('.product-block')
            .eq(3)
            //.contains('Ajax Full-Zip Sweatshirt')
            .click()

            cy.get('#tab-title-description > a').should('contain', 'Descrição')
    });
});