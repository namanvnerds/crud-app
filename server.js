const express = require('express')
const mongoose = require('mongoose')
const Student = require('./models/student')
const studentRouter = require('./routes/students')
const app = express()


mongoose.connect('mongodb://localhost/StudentDB', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});




app.set('view engine','ejs')
app.use(express.urlencoded({extended: false}))

app.get('/', async (req, res) => {
    const students = await Student.find().sort({ createdAt: 'desc' })
    res.render('views/index', { students: students })
  })
  
app.get('/', async (req, res) =>{
    const students = [{
        firstName: 'Naman',
        lastName: 'Rathod',
        age: 24,
    },
    {
        firstName: 'Aman',
        lastName: 'Shah',
        age: 25,
    },
    ]
    // ,
    // const students = await Student.find().sort({ createdAt: 'desc' })
    // res.render('students/index', { students: students })
    // res.render('index', {students : students})
})


app.use('/students', studentRouter)

app.listen(5000)