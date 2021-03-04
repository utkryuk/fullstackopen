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
        cy.get('#username').type('utkarsh')
        cy.get('#password').type('sekret')

        cy.get('#login-button').click()

        cy.contains('Utkarsh logged in')
    })
})