const mongoose = require('mongoose')
// const { JSDOM } = require('jsdom')

const studentSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    age:{
        type: String,
        required: true
    },
    mobileNo:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    profilePic:{
        type: String,
        required: true
    },

})

module.exports = mongoose.model('Student', studentSchema)