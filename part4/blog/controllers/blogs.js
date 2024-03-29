const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")


blogsRouter.get("/", async (request, response) => {
    const blogs= await Blog.find({}).populate("user",  {username:1,name:1})
    response.json(blogs)

})
blogsRouter.get("/:id", async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if (blog) {
        response.json(blog.toJSON())
    } else {
        response.status(404).end()
    }
});

blogsRouter.post("/", async (request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: "token invalid" })
    }
    const user = request.body
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id

    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog.toJSON())
})
blogsRouter.delete("/:id",async (request,response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: "token invalid" })
    }

    const user= request.user
    const blog = await Blog.findById(request.params.id)

    if ( blog.user.toString() === user.id.toString() ){
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    }
    else {
        response.status(401).json({
            error: "missing premission to do this"})

    }


})
blogsRouter.put("/:id", async (request, response) => {
    const blog = {
        likes: request.body.likes,
        author: request.body.author,
        url: request.body.url,
        title: request.body.title

    }
    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).end()

})


module.exports = blogsRouter