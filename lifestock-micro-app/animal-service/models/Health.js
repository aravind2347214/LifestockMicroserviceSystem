
const mongoose = require("mongoose")
// Health Data Schema
const healthDataSchema = new mongoose.Schema({
    name:{type:String},
    temperature: {type:Number},
    heartRate: {type:Number},
  });
  
const Health = mongoose.model('Health', healthDataSchema);
module.exports = Health;