
var lodash = require("lodash")
const dummy = () => {
    return 1
}
const totalLikes =(blogs) =>{
    const total = blogs.reduce((sum, blog) => sum + blog.likes, 0)

    return total
}
const favoriteBlog =(blogs) =>{
    if (blogs.length===0){
        return "no blogs"
    }
    const favorite = blogs.reduce((prev,current) => {
        return prev.likes > current.likes ? prev : current
    })
    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes

    }

}
const mostBlogs = (blogs) => {
    if (blogs.length===0){
        return "no blogs"
    }
    const mostblogs = lodash
        .chain(blogs)
        .groupBy("author")
        .map((blogs,author)=>{
            return{
                author: author,
                blogs: blogs.length
            }
        })
        .orderBy("blogs","desc")
        .head()
        .value()
    return  mostblogs
}
const mostLikes = (blogs) =>{
    if (blogs.length===0){
        return "no blogs"
    }

    const mostlikes = lodash
        .chain(blogs)
        .groupBy("author")
        .map((blogs,author)=>{
            const likes = lodash.sumBy(blogs, "likes")
            return{
                author: author,
                likes: likes
            }
        })
        .orderBy("likes","desc")
        .head()
        .value()
    return  mostlikes
}



module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}