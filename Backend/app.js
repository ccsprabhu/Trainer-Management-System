const express = require('express');

const Allocationdata = require('./src/models/Allocationdata');
const cors = require('cors');
var app = new express();
app.use(cors());
app.use(express.urlencoded({extended:true})); 
app.use(express.json());
const signupRouter =require('./src/routes/signuproutes');
const signinRouter =require('./src/routes/signinroutes');
const adminRouter=require('./src/routes/adminroutes');
const trainerRouter=require('./src/routes/trainerroutes')
app.use('/signup',signupRouter);
app.use('/signin',signinRouter);
app.use('/admin',adminRouter);
app.use('/trainer',trainerRouter)
app.get('/allocatedlist',function(req,res){
  res.header("Access-Control-Allow-Origin","*")
  res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
   Allocationdata.find()
  .then(function(all){
     res.send(all);
    })     
});

app.listen(3000, function(){
    console.log('listening to port 3000');
  });