const mongoose = require("mongoose")
mongoose.set("strictQuery", false)
const url = process.env.MONGODB_URI
console.log("connecting to", url)

mongoose
    .connect(url)
    .then(()=> {
        console.log("connected to MongoDB")
        console.log(url)
    })
    .catch((error) => {
        console.log("errooor connecting to MongoDB:", error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: (number) => {
                return /^\d{2,3}-\d+$/.test(number)
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: true

    }
})

personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
module.exports = mongoose.model("Person", personSchema)