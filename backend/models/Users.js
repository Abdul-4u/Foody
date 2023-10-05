const mongoose =require('mongoose');
//defining the schema
const {Schema} = mongoose;

const userSchema = new Schema({
name:{
    type:String,
    required:true
},
location:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
passward:{
    type:String,
    required:true
},
date:{
    type:Date,
    //date.now for default date
    default:Date.now
}

})
//Exporting the schema
module.exports=mongoose.model('users',userSchema);