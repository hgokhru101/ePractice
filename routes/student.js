const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
var multer = require('multer');
const db = require('../models/user');
var fs = require('fs');
var path = require('path');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });

router.post('/upload-data', bodyParser.json(),upload.single('file'),function (req, res) {
    console.log("DDAAMMMAAA")
    const u = new db.User({
        email: req.body.email,
        fname: req.body.fname,
        lname:req.body.lname,
        age:req.body.age,
        img: {
            data: fs.readFileSync(path.join(__basedir, "/uploads/" , req.file.filename)),
            contentType: 'image/png'
        }
    })
    u.save();
    fs.unlinkSync(path.join(__basedir, "/uploads/" , req.file.filename));
    res.redirect('/')
})
router.get('/display',function(req,res){

    db.User.find({},function(err,item){
        console.log(item);
        res.render('display.ejs',{items:item});
    })
})
router.get('/', function (req, res) {
    res.render('form.ejs')
})
module.exports = router