const express=require('express');
const Joi = require('Joi');
const mongoose=require('mongoose');
const Customer =mongoose.model('Customer',new mongoose.Schema({
    name: {
        type: String,
        required:true,
        minlength:5,
        maxlenght:50
    },
    phone: {
        type: Number,
        required:true,
        minlength:5,
        maxlength:50
    },
    isGold:{
          type: Boolean,
          default:false
    }
}));
function validateCustomers(){
    const Schema={
        name:Joi.string().min(3).max(50).required(),
        phone:Joi.number().min(10).max(50).required(),
        isGold:Joi.boolean()
    };
    return Joi.validate(Customer,Schema);
}
exports.Customer=Customer;
exports.validate=validateCustomers;