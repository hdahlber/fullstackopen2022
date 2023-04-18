require("dotenv").config();
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require("mongoose");
const Person = require("./models/person")
app.use(cors())
app.use(express.json())
app.use(express.static("build"))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :info'))

morgan.token("info", (request, response) =>{

    return request.method ==="POST" ? JSON.stringify(request.body) :  request.method
})


app.get('/info', (request, response, next) => {
    const date = new Date()
    Person.find({})
        .then(person => {
            response.send(`<div>
                                    <p>Phonebook has info for ${person.length}</p>
                                    <p>${date}</p>
                                </div>`)

        })
        .catch(error => next(error))

})
app.get('/api/persons', (request, response, next) => {
    Person.find({})
        .then(person => {
            response.json(person)
        })
        .catch(error => next(error))
})
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else{
                response.status(404).end()
            }
        })
        .catch(error => next(error))

})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result =>{
            response.status(204).end()
        })
        .catch(error=> next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    if(body.hasOwnProperty("name") && body.hasOwnProperty("number")){
        const person = new Person({
            name: body.name,
            number: body.number
        })
        person.save()
            .then(savedPerson => {
                response.json(savedPerson)
            })
            .catch(error => next(error))

    }
    else{
        response.status(400)
        response.send("Missing values need both name and number")
    }

})

app.put("api/persons/:id",(request,response,next) => {
    const body = request.body
    const person = {
        name: body.name,
        number: body.number
    }
    Person.findByIdAndUpdate(request.params.id,person,{ new :true })
        .then(updatedPerson =>{
            response.json(updatedPerson)
        })
        .catch(error => next(error))


})


const errorHandler =(error, request,response,next) =>{
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}
app.use(errorHandler)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})