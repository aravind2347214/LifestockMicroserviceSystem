const mongoose = require("mongoose")

// Schedule Schema
const scheduleSchema = new mongoose.Schema({
    name:{type:String},
    feedTime: {type:String},
    feedType: {type:String},
    feedQuantity: {type:String}
  });
  
const Schedule = mongoose.model('Schedule', scheduleSchema);
module.exports = Schedule