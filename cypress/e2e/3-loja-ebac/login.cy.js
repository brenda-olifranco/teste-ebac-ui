/// <reference types="cypress"/>
const perfil = require('../../fixtures/perfil.json')

describe('Funcionalidade: Login', () => {
    
    beforeEach(() => {
        cy.visit('minha-conta')
    });
    
    afterEach(() => {
        cy.screenshot()
    });

    it('Deve fazer login com sucesso', () => {
        cy.get('#username').type('brenda.teste@teste.com.br')
        cy.get('#password').type('teste@123')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, brenda.teste (não é brenda.teste? Sair)')
    })

    it('Deve exibir uma mensagem de erro ao inserir usuário inválido', () => {
        cy.get('#username').type('xxxxx.teste@teste.com.br')
        cy.get('#password').type('teste@123')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-error > li').should('contain', 'Endereço de e-mail desconhecido.')

    });

    it('Deve exibir mensagem de erro ao inserir senha inválida', () => {
        cy.get('#username').type('brenda.teste@teste.com.br')
        cy.get('#password').type('testexxxx@123')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-error').should('exist')
        
    });

    it('Deve fazer login com sucesso - Usando massa de dados', () => {
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, brenda.teste (não é brenda.teste? Sair)')
        
    });

    it('Deve fazer login com sucesso - Usando Fixture', () => {
            cy.fixture('perfil').then( dados => {
            cy.get('#username').type(dados.usuario)
            cy.get('#password').type(dados.senha, {log:false})
            cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, brenda.teste (não é brenda.teste? Sair)')
        })
        
    });

    it('Deve fazer login com sucesso usando comandos customizados', () => {
        cy.login('brenda.teste@teste.com.br', 'teste@123')
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, brenda.teste (não é brenda.teste? Sair)')

    });

})