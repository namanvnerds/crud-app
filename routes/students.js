const express = require('express')
const Student = require('./../models/student')
const router = express.Router()

router.get('/new', (req, res)=>{
    res.render('students/new', {student: new Student()})
})

router.get('/:id', async (req, res) =>{
    const student = await Student.findById(req.params.id)
    res.render('students/show', {student: student})

})

router.delete('/:id', async (req, res) => {
    await Student.findByIdAndDelete(req.params.firstName)
    res.redirect('/')
  })
  
router.post('/', async (req, res) =>{
    const student = new Student({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        mobileNo: req.body.mobileNo,
        email: req.body.email,
        profilePic: req.body.profilePic,
    })
    try{
        student = await student.save()
        res.redirect(`/students/${student.id}`)
    }catch(e){
        console.log(e)
        res.render('students/new',{student: student})
    }
})

module.exports = router