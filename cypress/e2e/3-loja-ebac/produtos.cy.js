/// <reference types="cypress"/>
import produtosPage from "../../support/page-objects/produtos.page";

describe('Funcionalidade: Produtos', () => {

    beforeEach(() => {
        produtosPage.visitarUrl()
    });

    it('Deve selecionar um produto da lista', () => {
        produtosPage.buscarProdutoLista('Abominable Hoodie')

            cy.get('#tab-title-description > a').should('contain', 'Descrição')
    });


    it('Deve buscar um produto com sucesso', () => {
        produtosPage.buscarProduto('Aero Daily Fitness Tee')

        cy.get('.product_title').should('exist')
    });

    it('Deve visitar a página do produto ', () => {
        produtosPage.visitarProduto('apollo running short')
        cy.get('.product_title').should('exist')

    });

    it('Deve adicionar produto ao carrinho', () => {
        let qtd = 5
        produtosPage.buscarProduto('Ariel Roll Sleeve Sweatshirt')
        produtosPage.addProdutoCarrinho('M', 'Green', qtd )
        cy.get('.woocommerce-message').should('exist')

    });

    it.only('Deve adicionar produto ao carrinho buscando da massa de dados', () => {
        cy.fixture('produtos').then(dados => {
        produtosPage.buscarProduto(dados[0].nomeProduto)
        produtosPage.addProdutoCarrinho(
            dados[0].tamanho, 
            dados[0].cor, 
            dados[0].quantidade)
        cy.get('.woocommerce-message').should('contain', dados[0].nomeProduto)
        })

        

    });
});

    
