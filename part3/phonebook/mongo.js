const mongoose = require("mongoose")
const password = process.argv[2]
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})
const Person = mongoose.model("persons", personSchema)
const url = `mongodb+srv://hdahlber:${password}@cluster1.3u9i3iu.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.set("strictQuery",false)
mongoose.connect(url)

if (process.argv.length<3) {
    console.log("give password as argument")
    process.exit(1)
}
else if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log("PHONEBOOK:")
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}
else if (process.argv.length > 3){
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name: name,
        number: number,
    })
    person.save().then(() => {
        console.log("person saved!")
        mongoose.connection.close()
    })

}




