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

            cy.get('html').should('not.contain', 'Utkarsh logged in')
        })
    })

    describe.only('When logged in', function() {

        beforeEach(function() {
            cy.login({username: 'utkarsh', password: 'sekret'})
        })

        it('A blog can be created', function() {
        
        const newBlog = {
            title: 'A new blog added',
            author: 'Tester',
            url: 'www.google.com'
        }    
        cy.contains('create new blog').click()

        cy.get('.blog-title').type(newBlog.title)
        cy.get('.blog-author').type(newBlog.author)
        cy.get('.blog-url').type(newBlog.url)

        cy.get('.blog-submit').click()

            cy.get('.success-class')
                .should('contain', newBlog.title)
                .should('have.css', 'color', 'rgb(0, 128, 0)')
                .should('have.css', 'background-color', 'rgb(211, 211, 211)')

            cy.get('.blogDiv')
                .should('have.css', 'padding-top', '10px')
                .should('have.css', 'padding-left', '2px')
                .should('have.css', 'border-style', 'solid')
                .should('have.css', 'border-width', '1px')
                .should('have.css', 'margin-bottom', '5px')

            cy.get('.view-btn').contains('view')

        })

        it('a blog can be liked', function() {

            cy.addBlog({title: 'Testing My blog', author: 'Tester', url: 'www.google.com'})
            
            cy.get('.view-btn').click()
            cy.get('.hide-btn').contains('hide')

            cy.get('.addLikes-btn').click()
            cy.get('.addLikes-btn').click()
            cy.get('.addLikes-btn').click()
            cy.get('.likes').contains(3)
        })


        it('a blog can be deleted by authorized user', function() {

            cy.addBlog({title: 'Testing My blog', author: 'Tester', url: 'www.google.com'})
            cy.get('.view-btn').click()
            cy.get('.hide-btn').contains('hide')

            cy.get('.removeBlog-btn').click()

            cy.get('html').should('not.contain', 'Testing My blog')
        })

        it('a blog cannot be deleted by unauthorized user', function() {

            cy.addBlog({title: 'Testing My blog', author: 'Tester', url: 'www.google.com'})

            cy.get('.logout-btn').click()

            cy.addUser({name: 'Yash', username: 'yash', password: 'newpassword'})

            cy.login({username: 'yash', password: 'newpassword'})

            cy.get('.view-btn').click()
            cy.get('.hide-btn').contains('hide')

            cy.get('html').should('not.contain', 'remove')
        })

    })
})