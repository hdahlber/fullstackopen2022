const listHelper = require("../utils/list_helper")
const {emptyBlog,listWithOneBlog,blogs }= require("../utils/data")

describe("total likes", () => {
    test("when list has only one blog, equals the likes of that", () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test("of a bigger list is calculated right", () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })
    test("when list has 0 blogs, equals the likes of that", () => {
        const result = listHelper.totalLikes(emptyBlog)
        expect(result).toBe(0)
    })
})