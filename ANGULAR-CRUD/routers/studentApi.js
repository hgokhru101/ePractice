var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var StudentModel = require('../models/studentschema');

// Connecting to database 
var query = 'mongodb://localhost/student'

const db = (query);
mongoose.Promise = global.Promise;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (error) {
    if (error) {
        console.log("Error!" + error);
    }
});

router.post('/save', function (req, res) {
    var newStudent = new StudentModel();
    newStudent.StudentId = req.body.StudentId;
    newStudent.Name = req.body.Name;
    newStudent.Roll = req.body.Roll;
    console.log(req.body.Birthday);
    newStudent.Birthday = new Date(req.body.Birthday);

    newStudent.save(function (err, data) {
        if (err) {
            console.log(err.message);
        } else {
            res.send("Data inserted");
        }
    });
});

router.get('/fetchdata', async function(req,res){
    try {
        const data = await StudentModel.find({})
        res.send(data)
    } catch (error) {
        res.status(500).send("Something went wrong");
    }
})
router.get('/findfirst/:id', function (req, res) {
    StudentModel.findOne({
            StudentId: req.params.id
        },
        function (err, data) {
            if (err) {
                console.log(err);
                res.status(500).send("Something went wrong");
            } else {
                res.send(data);
            }
        });
});

router.post('/update', async function (req, res) {

    try {
        const data = await StudentModel.findOneAndUpdate({
            StudentId: req.body.id
        }, {
            Name: req.body.Name
        }, {
            new: true
        })
        res.send(data)
    } catch (error) {
        res.status(500).send("Something went wrong");
    }
});
module.exports = router;