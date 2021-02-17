const dummy = require('../utils/list_helper').dummy
const totalLikes = require('../utils/list_helper').totalLikes
const favouriteBlog = require('../utils/list_helper').favouriteBlog
const mostBlogs = require('../utils/list_helper').mostBlogs
const mostLikes = require('../utils/list_helper').mostLikes

const helper = require('./test_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = dummy(blogs)
    expect(result).toBe(1)
})


describe('total likes', () => {

    const listWithOneBlog = [
        {
            id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    test('of empty list is zero', () => {

        expect(totalLikes([])).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {

        expect(totalLikes(listWithOneBlog)).toBe(5)
    })


    test('of a bigger list is calculated right', () => {

        expect(totalLikes(helper.initialBlogs)).toBe(36)
    })
})

const favouriteblog = {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
}


describe('favourite blog', () => {

    test('from a bigger list', () => {
        expect(favouriteBlog(helper.initialBlogs)).toEqual(favouriteblog)
    })
})

describe('most blogs', () => {

    test('from an empty list', () => {
        
        expect(mostBlogs([])).toEqual(null)
    })
    
    test('from a single blog', () => {
        
        const singleBlog = [helper.initialBlogs[0]]

        expect(mostBlogs(singleBlog)).toEqual({
            author: 'Michael Chan',
            blogs: 1
        })
    })

    test('from a bigger list', () => {

        expect(mostBlogs(helper.initialBlogs)).toEqual({
            author: 'Robert C. Martin',
            blogs: 3
        })
    })
    
})

describe('most likes', () => {

    test('from an empty list', () => {
        
        expect(mostLikes([])).toEqual(null)
    })
    
    test('from a single blog', () => {

        const singleBlog = [helper.initialBlogs[0]]

        expect(mostLikes(singleBlog)).toEqual({
            author: 'Michael Chan',
            likes: 7
        })
    })

    test('from a bigger list', () => {
        
        expect(mostLikes(helper.initialBlogs)).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 17
        })
    })
})

