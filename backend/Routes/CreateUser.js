const express = require('express');
const router = express.Router();

const   User = require('../models/Users');

router.post('/createuser',async(req,res)=>{
   //making static schemma/data
    try{
       await User.create({
            name:req.body.name,
            location:req.body.location,
            email:req.body.email,
            passward:req.body.passward
            
        })
      
        res.json({success:true});
    }
    catch(err){
        console.log(err);
        res.json({success:false});
    }
})
//exporting
module.exports=router;