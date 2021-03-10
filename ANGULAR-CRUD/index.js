const express=require('express'); 
const path=require('path')
const api = require('./routers/studentApi'); 
const port=3000; 
const app=express(); 
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, function() { 
    console.log("Server is listening at port:" + port); 
});  
  
// Parses the text as json 
app.use(express.json());  

// Parses the text as url encoded data 
app.use(express.urlencoded({extended: true}));  

  
app.use('/api', api);

app.get('/',function(req,res){
    res.sendFile('pages/index.html',{root: __dirname });
})