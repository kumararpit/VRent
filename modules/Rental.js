const express=require('express');
const Joi = require('Joi');
const mongoose=require('mongoose');

const Rental= mongoose.model('Rental',new mongoose.Schema({
    customer:{
        type:new mongoose.Schema ({
            name:{
                type:String,
                required:true,
                minlength:5,
                maxlength:50
            },
            isGold:{
                type:Boolean,
                default:false
            },
            Phone:{
                type:Number,
                required:true,
                minlength:5,
                maxlength:50
            },
        }),
        required:true
    },
    movie:{
        type: new mongoose.Schema({
            title:{
                type:String,
                required:true,
                trim:true,
                minlength:5,
                maxlength:255
            },
            dailyRentalRate:{
                type:Number,
                required:true,
                min:0,
                max:255
            },
        }),
        required:true
    },
    dateOut:{
        type:date,
        required:true,
        default:date.now
    },
    dateReturn:{
        type:date
    },
    RentalFee:{
        type:Number,
        min:0
    }
    
}));
function validateRental(rental){
    const Schema={
        customerId:Joi.string().required(),
        movieId:Joi.string().required()
    };
    return Joi.validate(rental,Schema);
};
exports.Rental=Rental;
exports.validate=validateRental;