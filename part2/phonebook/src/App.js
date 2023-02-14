import { useState } from 'react'
import Person from "./components/Person";




const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber,setNewNumber] =useState("")
    const [newSearchName,setSearchName] =useState("")


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

            setPersons(persons.concat(personObject))
            setNewName('')
            setNewNumber("")
        }
    }

    const searchNames = persons.filter(person => person.name.toLowerCase().includes(newSearchName))


    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }
    const handleSearchChange = (event) => {
        console.log(event.target.value)
        setSearchName(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                search:<input value={newSearchName}
                onChange={handleSearchChange}/>
            </div>
            <h3>add a new</h3>
            <form onSubmit={addPerson}>
               <div>
                   name:<input value={newName}
                   onChange={handleNameChange}/>
               </div>
                <div>
                    number:<input value={newNumber}
                    onChange={handleNumberChange}/>
                </div>
                <div>
                    <button type="submit">add </button>
                </div>
            </form>
            <h3>Numbers</h3>

            <ul>
                {searchNames.map(person =>
                    <Person key={person.name} person={person} />
                )}
            </ul>

            <div>debug: {newName}</div>
        </div>
    )
}

export default App