const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tms',{ useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;
const AllocationSchema = new Schema({
  
    name: String,
    email:String,
    startdate:String,
    enddate: String,
    time: String,
    course: String,
    courseid: String,
    batchid: String,
    meetinglink: String   
  });
  
  const Allocationdata = mongoose.model('Allocationdata',AllocationSchema);
  module.exports = Allocationdata;