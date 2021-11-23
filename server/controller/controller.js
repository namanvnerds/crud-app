var Studentdb = require('../model/model');

// create and save new student
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new student
    const student = new Studentdb({
        name : req.body.name,
        email : req.body.email,
        gender: req.body.gender,
        status : req.body.status
    })

    // save student in the database
    student
        .save(student)
        .then(data => {
            //res.send(data)
            res.redirect('/add-student');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all students/ retrive and return a single student
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Studentdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found student with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving student with id " + id})
            })

    }else{
        Studentdb.find()
            .then(student => {
                res.send(student)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving student information" })
            })
    }

    
}

// Update a new idetified student by student id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Studentdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update student with ${id}. Maybe student not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update student information"})
        })
}

// Delete a student with specified student id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Studentdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "student was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete student with id=" + id
            });
        });
}