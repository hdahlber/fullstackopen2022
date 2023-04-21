const listHelper = require("../utils/list_helper")
const {emptyBlog,listWithOneBlog,blogs }= require("../utils/data")
describe("Person with most blogs", () => {
    test("when list has many blogs, who has most blogs ", () => {
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual({
            author: "Robert C. Martin",
            blogs: 3
        })
    })
    test("when list 1 blog, who has most blogs ", () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            blogs: 1
        })
    })
    test("when list zero blogs, who has most blogs ", () => {
        const result = listHelper.mostBlogs(emptyBlog)
        expect(result).toBe("no blogs")
    })
})
