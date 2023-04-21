const dummy = () => {
    return 1
}
const totalLikes =(blogs) =>{
    const total = blogs.reduce((sum, blog) => sum + blog.likes, 0)
    console.log(total)
    return total
}

module.exports = {
    dummy,
    totalLikes
}