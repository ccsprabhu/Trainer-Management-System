const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tms',{ useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;
const ApprovedSchema = new Schema({
  
    name: String,
    email: String,
    phone: String,
    address: String,
    qualification: String,
    skillset: String,
    current: String,
    designation: String,
    appliedcourse: String,
    typemp:String
  
  });
  var collectionName = 'trainerdatas'
  const Trainerdata = mongoose.model('Trainerdata', ApprovedSchema,collectionName );
  module.exports = Trainerdata;