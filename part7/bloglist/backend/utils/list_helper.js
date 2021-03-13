const lodash = require('lodash')

const dummy = () => {
    return 1
}

const totalLikes = (array) => {

    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return array.reduce(reducer, 0)

}

const favouriteBlog = (array) => {

    const maxLikes = Math
        .max(...array.map(blog => {
            return blog.likes
        }))
    
    return array.find(blog => {
        return blog.likes === maxLikes
    })
}

const mostBlogs = (blogs) => {

    if (blogs.length === 0 || blogs === null) {
        return null
    }
    const groupByAuthor = lodash
        .groupBy(blogs, (blog) => {
            return blog.author
        })

    const authors = lodash.toArray(groupByAuthor)

    // console.log(typeof(groupByAuthor))
    // console.log(typeof(author))

    const maxGroup =  lodash.maxBy(authors, (author) => {
        return author.length
    })

    return {
        author: maxGroup[0].author ,
        blogs: maxGroup.length
    }
}

const mostLikes = (blogs) => {

    if (blogs === null || blogs.length === 0) {
        return null
    }

    const groupByAuthor = lodash.groupBy(blogs, (blog) => {
        return blog.author
    })

    const authors = lodash.toArray(groupByAuthor)
    // console.log(authors)
    const likes = []

    for (const author of authors) {
        // console.log(author)
        const sum = author.reduce((sum, author) => {
            return sum + author.likes 
        }, 0)

        likes.push({
            author: author[0].author, 
            likes: sum
        })
    }

    return lodash.maxBy(likes, (obj) => {
        return obj.likes
    })

}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}