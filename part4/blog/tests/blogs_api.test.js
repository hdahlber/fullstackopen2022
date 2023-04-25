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
    const responese = await api.get("/api/blogs")
    expect(responese.body).toHaveLength(helper.blogs.length +1)

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

afterAll(async () => {
    await mongoose.connection.close()
})