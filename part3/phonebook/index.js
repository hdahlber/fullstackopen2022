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


app.get('/info', (request, response) => {
    const date = new Date()
    Person.find({}).then(person => {
    response.send(`<div>
                            <p>Phonebook has info for ${person.length}</p>
                            <p>${date}</p>
                        </div>`)
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
        response.json(person)
    })
})
/*
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else{
        response.status(404).end()
    }
})

 */
app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result =>{
            response.status(204).end()
        })
        .catch(error=> next(error))
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if(body.hasOwnProperty("name") && body.hasOwnProperty("number")){
        const person = new Person({
            name: body.name,
            number: body.number
        })
        person.save().then(savedPerson => {
            response.json(savedPerson)
        })
    }
    else{
        response.status(400)
        response.send("Missing values need both name and number")
    }


    /*
    const body = request.body
    if(body.hasOwnProperty("name") && body.hasOwnProperty("number")){
        const person = {
            name: body.name,
            number: body.number
        }

        if(persons.find((homonym)=>homonym.name === person.name)){
            response.status(400)
            response.send("name must be unique")
        }else {
            //console.log(person)
            persons = persons.concat(person)
            response.json(person)
        }
    }else{
        response.status(400)
        response.send("Missing values need both name and number")

    }*/
})





const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})