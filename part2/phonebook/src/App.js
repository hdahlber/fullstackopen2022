import React, { useState, useEffect } from 'react';
import PersonForm from "./components/PersonForm";
import axios from "axios";
import Persons from "./components/Persons";
import Filter from "./components/Filter";




const App = () => {
    const [persons, setPersons] = useState([])
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
    const hook = () => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }
    useEffect(hook, [])




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