import Person from "./Person";

const Persons = ({ person }) => {
    return (
        <ul>
            {searchNames.map(person =>
                <Person key={person.name} person={person} />
            )}
        </ul>
    )
}

export default Persons