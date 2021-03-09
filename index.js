const express = require('express');
var Parser = require('rss-parser');
var p=new Parser();
const mongoose = require('mongoose');
const db = require('./models/user');
var path = require('path');
global.__basedir = __dirname;
/*
const cors = require('cors');
const db = require('./models/user'); */

const port = parseInt(process.env.PORT, 10) || 3000
var app = express();
app.set('view engine', 'ejs');
/* app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }
)); */

/* 
app.use(bodyParser.urlencoded({
    extended: true,
}));
*/
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/aitexam';
console.log(uri);
mongoose.connect(uri, {
    useNewUrlParser: true,
    server: { auto_reconnect: true }
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err)); 

app.get('/', function (req, res) {
    var data1 ="Sagar";
    res.render('home.ejs',{data:data1})
});

app.use('/student', require('./routes/student'));

app.get('/rss_feeds',function(req,res){
    const query = req.query.query;
    
    var url=['https://in.pcmag.com/feed.xml'];
    (async()=>{
         var feed = await p.parseURL(url[0]);
         console.log(feed)
         res.send(feed);
    })()       
           
            
    
      
      

      
})
app.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
});
