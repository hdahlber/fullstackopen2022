const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const helper= require("../utils/data")
const Blog = require("../models/blog")


beforeEach(async () => {
    await Blog.deleteMany({})
    const BlogObjects = helper.blogs
        .map(blog => new Blog(blog))
    const promiseArray = BlogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})
test("blogs are returned as json, and check sum of them", async () => {
    const responese = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)
    expect(responese.body).toHaveLength(helper.blogs.length)


})

test("blogs have property id defined", async () => {
    const responese = await api.get("/api/blogs")
    for(const blog of responese.body){
        expect(blog.id).toBeDefined()
    }


})

test("creation of a new blog", async () => {


    await api
        .post("/api/blogs")
        .send(helper.listWithOneBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)
    const responese = await helper.blogsInDb()
    expect(responese).toHaveLength(helper.blogs.length +1)

})

test("if no likes then default should be 0", async () => {
    const responese = await api
        .post("/api/blogs")
        .send(helper.listWithOneBlogAndLikesMissing)
        .expect(201)
        .expect("Content-Type", /application\/json/)
    expect(responese.body.likes).toBe(0)
    //console.log(responese.body.likes)

})
test("if title missing, response 400", async () => {
    await api
        .post("/api/blogs")
        .send(helper.listWithOneBlogAndTitleMissing)
        .expect(400)

})
test("if url missing, response 400", async () => {
    await api
        .post("/api/blogs")
        .send(helper.listWithOneBlogAndURLMissing)
        .expect(400)
})

test("delete of a blog", async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
        helper.blogs.length - 1
    )
})
describe("update a blog with likes ", () => {
    test("update likes, should be successfull", async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send({likes: 123})
            .expect(200)

    })
    test("update likes with a string, should 400", async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send({likes: "eqwewweqew"})
            .expect(400)

    })
    test("update likes with multiple params, should 200", async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const update ={
            author: "eqwewweqew",
            likes: 134,
            url: "http://ewqewqewwwe.com",
        }
        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(update)
            .expect(200)

    })
})

afterAll(async () => {
    await mongoose.connection.close()
})