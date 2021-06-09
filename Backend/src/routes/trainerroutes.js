const express=require('express');
const trainerRouter =express.Router();

var nodemailer=require('nodemailer');

const Applicationlist = require('../models/Applicationlist');
const  Trainerdata=require('../models/Trainerdata');
const Allocationdata=require('../models/Allocationdata')
trainerRouter.post('/insert', function (req, res) {
   
    console.log(req.body);
  
    var applicationlist = {
      name: req.body.applicationlist.name,
      email: req.body.applicationlist.email,
      phone: req.body.applicationlist.phone,
      address: req.body.applicationlist.address,
      qualification: req.body.applicationlist.qualification,
      skillset: req.body.applicationlist.skillset,
      current: req.body.applicationlist.current,
      designation: req.body.applicationlist.designation,
      appliedcourse: req.body.applicationlist.appliedcourse,
      imageUrl: req.body.applicationlist.imageUrl,
    }
    var applicationlist =new Applicationlist(applicationlist);
    applicationlist.save();
  });
  trainerRouter.get('/applicationlist', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTION");
  Applicationlist.find()
      .then(function (applicationlists) {
        res.send(applicationlists);  
      }); 
  });
trainerRouter.get('/:id',function (req,res){
    const id= req.params.id;
    console.log(id)
    Applicationlist.findOne({_id:id})
    .then(function(trainer){
       res.send(trainer);
    })
  });
 
  
  trainerRouter.post('/approvedlist',async function (req, res) {
   
    console.log(req.body);
  
    var approvedlist = {
      name: req.body.trainer.name,
      email: req.body.trainer.email,
      phone: req.body.trainer.phone,
      address: req.body.trainer.address,
      qualification: req.body.trainer.qualification,
      skillset: req.body.trainer.skillset,
      current: req.body.trainer.current,
      designation: req.body.trainer.designation,
      appliedcourse: req.body.trainer.appliedcourse,
    //   imageUrl: req.body.applicationlist.imageUrl,
        typemp:req.body.trainer.typemp
    }
    var approvedlist =new Trainerdata(approvedlist);
    approvedlist.save();
    const traineremail=await Applicationlist.findOne({email:approvedlist.email})
    
    var transport=nodemailer.createTransport(
      {
        service:'gmail',
        auth:{
          user:'mittup2020@gmail.com',
          pass:'mittupoocha@1'
        }
      }
    )
    
    var mailOptions={
      
      from:'mittup2020@gmail.com',
      to:approvedlist.email,
      subject:'You are Approved',
      text:`Congratulations ${approvedlist.name}.You are approved as ${approvedlist.typemp} and your id is ${approvedlist._id}.`
    }
    transport.sendMail(mailOptions,function(error,info){
      if(error){
        console.log(error)
      }
      else{
        console.log("email sent"+info.response)
      }
    })
    Applicationlist.findOneAndDelete({"_id":traineremail._id})
    .then(()=>{
        console.log('success')
        res.send();
    })
  });
  
  // Getting approvedlist
  trainerRouter.get('/', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTION");
    Trainerdata.find()
      .then(function(approvedlist) {
        res.send(approvedlist);  
      }); 
  });
   trainerRouter.get('/approve/:id',function (req,res){
    const id= req.params.id;
    // console.log(id)
    Trainerdata.findOne({_id:id})
    .then(function(trainer){
       res.send(trainer);
    })
  });
  
  trainerRouter.post('/allocatedlist',function (req, res) {
   
    console.log(req.body);
   
    var allocatedlist = {
      name: req.body.allocate.name,
      email: req.body.allocate.email,
      startdate: req.body.allocate.startdate,
      enddate: req.body.allocate.enddate,
      time:req.body.allocate.time,
      course: req.body.allocate.course,
      courseid: req.body.allocate.courseid,     
      batchid: req.body.allocate.batchid,
      meetinglink: req.body.allocate.meetinglink      
    }
    var allocatedlist =  new Allocationdata(allocatedlist);
    allocatedlist.save();
    var transport=nodemailer.createTransport(
      {
        service:'gmail',
        auth:{
          user:'mittup2020@gmail.com',
          pass:'mittupoocha@1'
        }
      }
    )
    
    var mailOptions={
      
      from:'mittup2020@gmail.com',
      to: allocatedlist .email,
      subject:'Course Assignment',
      text:`Hi ${allocatedlist.name}.You are assigned the course ${allocatedlist.course}.The details are
      Start Date:${allocatedlist.startdate},
      End Date: ${allocatedlist.enddate},
      Time:${allocatedlist.time},
      Course: ${allocatedlist.course},
      Course Id: ${allocatedlist.courseid},     
      Batch Id: ${allocatedlist.batchid},
      Meeting Link: ${allocatedlist.meetinglink}
      `
    }
    transport.sendMail(mailOptions,function(error,info){
      if(error){
        console.log(error)
      }
      else{
        console.log("email sent"+info.response)
      }
    })
    
  });
//   trainerRouter.get('/allocatedlist',function(req,res){
//     res.header("Access-Control-Allow-Origin","*")
//     res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
//      Allocationdata.find()
//     .then(function(all){
//        res.send(all);
//       })     
// });
  
  module.exports=trainerRouter;