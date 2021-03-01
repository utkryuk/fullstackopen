import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDom } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog /> testing', () => {
    let component
    beforeEach(() => {
        const blog = {
            title: 'testing the blog',
            author: 'tester',
            likes: 0,
            url: 'www.testing-react-app.com',
            user: {
                username: 'Utkarsh'
            }
        }
        component = render(
            <Blog blog = {blog} user = {blog.user.username}/>
        )
    })

    test('default rendering of a blog component', () => {

        const div = component.container.querySelector('.hideFullBlogDiv')

        // console.log(component.container.debug())

        expect(div).toHaveTextContent('testing the blog')
        expect(div).toHaveTextContent('tester')
        expect(div).not.toHaveTextContent(0)
        expect(div).not.toHaveTextContent('www.testing-react-app.com')
    })

    test('full blog rendering when show button is clicked', () => {

        // component.debug()
        const showButton = component.getByText('view')
        fireEvent.click(showButton)

        const div = component.container.querySelector('.showFullBlogDiv')

        expect(div).toHaveTextContent('testing the blog')
        expect(div).toHaveTextContent('tester')
        expect(div).toHaveTextContent(0)
        expect(div).toHaveTextContent('www.testing-react-app.com')

        // fireEvent.click(showButton)

    })

    test('if Like button is clicked twice', () => {
        const viewButton = component.container.querySelector('.view-btn')

        fireEvent.click(viewButton)
        const likeButton = component.container.querySelector('.addLikes-btn')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        const likes = component.container.querySelector('likes')
        expect(likes).toHaveTextContent(2)

    })
})