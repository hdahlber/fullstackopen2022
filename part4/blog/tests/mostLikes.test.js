const listHelper = require("../utils/list_helper")
const {emptyBlog,listWithOneBlog,blogs }= require("../utils/data")

describe("most likes", () => {
    test("when list has only one blog, most likes for a author", () => {
        const result = listHelper.mostLikes(listWithOneBlog)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 5
        })

    })

    test("when list has only many blogs, most likes for a author", () => {
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
        })

    })
    test("when list has 0 blogs, most likes for a author", () => {
        const result = listHelper.mostLikes(emptyBlog)
        expect(result).toBe("no blogs")

    })
})