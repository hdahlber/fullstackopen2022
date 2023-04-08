import React, { useState, useEffect } from 'react';
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from './services/persons'
import Person from "./components/Person";
import Notification from "./components/Notification";




const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState("")
    const [newNumber,setNewNumber] = useState("")
    const [filter,setFilter] = useState("")
    const [Message,setMessage]= useState(null)


    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber,
            id: persons.length +1,


        }
        const found = persons.find(el => el.name ===newName)
        if(found) {
            if (newNumber.length !== 0) {
                if (window.confirm(`${newName} is already added to the phonebook, replace existing phone number?`)) {
                    const repl = persons.find(el => el.name === newName)
                    personService
                        .update(repl.id, personObject)
                        .then((response) => {
                            const responsePerson = persons.map((person) =>
                                person.id !== response.id ? person : response
                            );
                            setMessage(`Uppdated ${personObject.name} number to ${personObject.number}`)
                            setTimeout(() => {
                                setMessage(null)
                            }, 5000)
                            setPersons(responsePerson)
                            setNewName("")
                            setNewNumber("")
                        })
                }
            }
            else { window.alert(`Add the new phone number for ${newName}`);
            }
        }
        else if(newNumber.length===0 || newName.length===0){
                window.alert(`Add information`);
            }
        else {
            personService
                .create(personObject)
                .then(response => {
                    console.log(personObject)
                    setPersons(persons.concat(personObject))
                    setMessage(`Added ${personObject.name}`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)

                    setNewName("")
                    setNewNumber("")
                })
            /*
            console.log(personObject)
            setPersons(persons.concat(personObject))
            //console.log(persons)
            setNewName("")
            setNewNumber("")
            */

        }
    }

    const deletePerson = (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
            console.log(id)
            personService
                .remove(id)
                .then(response => {
                    setPersons(persons.filter(person => person.id !== id))


                })

        }
    }
    const hook = () => {
        console.log('effect')
        personService
            .getAll()
            .then(response => {
                console.log('promise fulfilled')
                console.log(response)
                setPersons(response)
                console.log()
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

    const searchFilter = persons.filter((person =>
        person.name.toLowerCase().includes(filter.toLowerCase())));
    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={Message}/>
            <Filter value={filter} onChange={handleSearchChange} />



            <h3>add a new</h3>

            <PersonForm
                addPerson={addPerson}
                newName={newName}
                newNumber={newNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
            />

            <h3>Numbers</h3>
            {searchFilter.map((persons) =>
            <Person key={persons.id} id={persons.id} name={persons.name} number={persons.number} deletePerson={deletePerson} />
            )
            }
        </div>
    )
}

export default App