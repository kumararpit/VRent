const express=require('express')
const mongoose=require('mongoose')

const Registeruser=mongoose.model('Registeruser',new mongoose.Schema({
    name:{
        type:String,
        minlength:5,
        maxlength:50,
        required:true
    },
    email:{
        type:String,
        minlength:5,
        maxlength:255,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        maxlength:255
    }
}));
exports.Registeruser=Registeruser;