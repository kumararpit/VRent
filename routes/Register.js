const{Registeruser}=require('../modules/Registeruser')
const bcrypt=require('bcrypt')
const express=require('express')
const mongoose=require('mongoose');
const router=express.Router();

router.post('/',async(req,res)=>{
    let user= await Registeruser.findOne({email:req.body.email});
    if(user) return res.status(404).send("email already registered");
   
         user=new Registeruser({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });
    const salt=await bcrypt.genSalt(10);
    user.password= await bcrypt.hash(user.password, salt);
    user=await user.save();
    res.send({
        name:user.name,
        email:user.email
    }
       
    );
});
module.exports=router;