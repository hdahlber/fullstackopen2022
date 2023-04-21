const dummy = () => {
    return 1
}
const totalLikes =(blogs) =>{
    const total = blogs.reduce((sum, blog) => sum + blog.likes, 0)
    console.log(total)
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


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}