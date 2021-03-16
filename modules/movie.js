const express=require('express');
const Joi = require('Joi');
const mongoose=require('mongoose');
const{GenreSchema}=require('./genre');
const Movie= mongoose.model('Movie',new mongoose.Schema({
    title:{
        type: String,
        required:true,
        trim:true,
        minlength:5,
        maxlength:255
    },
    genre:{
        type:GenreSchema,
        required: true
    },
    numberinstock:{
        type:Number,
        required:true,
        minlength:0,
        maxlength:255
    },
    dailyRentalRate:{
        type:Number,
        required:true,
        minlength:0,
        maxlength:255
    }
}));
function validatemovie(Movie){
    const Schema={
        title:Joi.string().min(5).max(255).required(),
        genreId:Joi.string().required(),
        numberinstock:Joi.number().min(0).max(255).required(),
        dailyRentalRate:Joi.number().min(0).max(255).required(),
    };
    return Joi.validate(Movie,Schema);
}
exports.Movie=Movie;
exports.validate=validatemovie;