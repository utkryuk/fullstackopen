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

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}