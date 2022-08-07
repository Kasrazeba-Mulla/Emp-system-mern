const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const empSchema = new Schema({
    name:{type:String, required:true},
    age:{type:Number, required:true},
    salary:{type:Number, required:true},
    email:{type:String, required:true},
    mobile:{type:Number, required:true},
})

module.exports = mongoose.model("Employee",empSchema);