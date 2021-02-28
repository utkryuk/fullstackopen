import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
// import { prettyDom } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog /> testing', () => {
    test('default rendering of a blog component', () => {

        const blog = {
            title: 'testing the blog',
            author: 'tester',
            likes: 0,
            url: 'www.testing-react-app.com',
            user: {
                username: 'Utkarsh'
            }
        }

        const component = render(
            <Blog blog = {blog} user = {blog.user.username}/>
        )

        const div = component.container.querySelector('.hideFullBlogDiv')

        // console.log(component.container.debug())

        expect(div).toHaveTextContent('testing the blog')
        expect(div).toHaveTextContent('tester')
        expect(div).not.toHaveTextContent('0')
        expect(div).not.toHaveTextContent('www.testing-react-app.com')
    })
})