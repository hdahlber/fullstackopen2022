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
    expect(responese.body).toHaveLength(6)


})

afterAll(async () => {
    await mongoose.connection.close()
})