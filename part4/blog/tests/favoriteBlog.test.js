const listHelper = require("../utils/list_helper")
const {emptyBlog,listWithOneBlog,blogs }= require("../utils/data")
describe("favorite blog", () => {

    test("when list has many blogs, what is most liked blog ", () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        })
    })
    test("when list has zero blogs,what is most liked blog", () => {
        const result = listHelper.favoriteBlog(emptyBlog)
        expect(result).toBe("no blogs")
    })
    test("when list has only one blog, what is most liked blog ", () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual({
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            likes: 5
        })
    })

})
