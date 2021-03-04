describe('Blog app', () => {

    beforeEach(() => {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Utkarsh',
            username: 'utkarsh',
            password: 'sekret'
        }
        cy.request('POST', 'http://localhost:3001/api/users', user)
        cy.visit('http://localhost:3000')
    })

    it('login form is shown', function() {
        cy.get('#username')
        cy.get('#password')

        cy.get('#login-button')
    })

    describe('login', function (){
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('utkarsh')
            cy.get('#password').type('sekret')

            cy.get('#login-button').click()
            cy.contains('Utkarsh logged in')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('fdsfsd')
            cy.get('#password').type('23412')

            cy.get('#login-button').click()
            // cy.contains('wrong username or password')
            cy.get('.error-class')
                .should('contain', 'wrong username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'background-color', 'rgb(211, 211, 211)')
        })
    })
})