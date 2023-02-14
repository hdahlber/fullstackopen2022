import React, { useState } from 'react'
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import Persons from "./components/Persons";
import Filter from "./components/Filter";




const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState("")
    const [newNumber,setNewNumber] =useState("")
    const [newFilter,setFilter] =useState("")


    const addPerson = (event) => {
        event.preventDefault()
        const found = persons.find(el => el.name ===newName)
        if(found){
            console.log("duplicate")
            window.alert(`${newName} is already added to phonebook`);
        }
        else {

            const personObject = {
                name: newName,
                number: newNumber,
                id: persons.length +1,


            }
            console.log(personObject)
            setPersons(persons.concat(personObject))
            //console.log(persons)
            setNewName("")
            setNewNumber("")


        }
    }




    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handleSearchChange = (event) => {
        setFilter(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={newFilter} onChange={handleSearchChange} />



            <h3>add a new</h3>

            <PersonForm
                addPerson={addPerson}
                newName={newName}
                newNumber={newNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
            />

            <h3>Numbers</h3>
            <Persons persons={persons} newFilter={newFilter} />
        </div>
    )
}

export default App