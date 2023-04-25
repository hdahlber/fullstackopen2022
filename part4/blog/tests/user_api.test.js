const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const helper= require("../utils/data")
const User = require("../models/user")


beforeEach(async () => {
    await User.deleteMany({})

    const UserObjects = helper.users
        .map(user => new User(user))
    const promiseArray = UserObjects.map(user => user.save())
    await Promise.all(promiseArray)
})

describe("Tests for user creation", () => {

    test("Users can be saved when everything is correct", async () => {
        const testUser = {
            username: "username",
            name: "name",
            password: "password"
        }
        await api
            .post("/api/users")
            .send(testUser)
            .expect(201)

    })
    test("username is missing,fails",async () =>{
        const testUser = {
            name: "name",
            password: "password"
        }
        await api
            .post("/api/users")
            .send(testUser)
            .expect(400)

    })
    test("password is missing, fails", async () =>{
        const testUser = {
            username: "username",
            name: "name"
        }
        await api
            .post("/api/users")
            .send(testUser)
            .expect(400)

    })

    test("username exist already, fails", async () =>{
        const testUser = {
            username: "root",
            name: "name",
            password: "password"
        }
        await api
            .post("/api/users")
            .send(testUser)
            .expect(400)

    })
    test("username is shorter then 3, fails",async ()=>{

        const testUser = {
            username: "rt",
            name: "name",
            password: "password"
        }
        await api
            .post("/api/users")
            .send(testUser)
            .expect(400)

    })


    test("password is shorter then 3, fails", async () =>{
        const testUser = {
            username: "user",
            name: "name",
            password: "pa"
        }
        await api
            .post("/api/users")
            .send(testUser)
            .expect(400)


    })
})

afterAll(async () => {
    await mongoose.connection.close()
})