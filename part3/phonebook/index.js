const express = require('express')
const app = express()
const morgan = require('morgan')
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :info'))

morgan.token("info", (request, response) =>{

    return request.method ==="POST" ? JSON.stringify(request.body) :  request.method
})




let persons =[
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    const date = new Date()
    const personsLenght = persons.length
    response.send(`<div>
                            <p>Phonebook has info for ${personsLenght}</p>
                            <p>${date}</p>
                        </div>`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else{
        response.status(404).end()
    }
})
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const randID = Number(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER))
    const body = request.body

    if(body.hasOwnProperty("name") && body.hasOwnProperty("number")){
        const person = {
            id: randID,
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

    }
})





const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})