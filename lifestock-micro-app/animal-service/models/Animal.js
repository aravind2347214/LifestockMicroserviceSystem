const mongoose = require("mongoose")
// Animal Schema
const animalSchema = new mongoose.Schema({
    type: {type:String},
    name: {type:String},
    age: {type:Number},
    weight: {type:Number},
    healthRecord:{type:mongoose.Schema.Types.ObjectId, ref:'Health'},
    schedule:{type:mongoose.Schema.Types.ObjectId, ref:'Schedule'}
  });
  
const Animal = mongoose.model('Animal', animalSchema);
module.exports = Animal;