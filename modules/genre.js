const express=require('express');
const Joi = require('Joi');
const mongoose=require('mongoose');
const GenreSchema =new mongoose.Schema({
    name: {
        type: String,
        required:true,
        minlength:5,
        maxlenght:50
    }
});
const Genre= mongoose.model('Genre',GenreSchema);
function validategenre(genre)
{
    const schema={
        name: Joi.string().min(3).required()
    };
return Joi.validate(genre,schema);
}
exports.GenreSchema=GenreSchema;
exports.Genre=Genre;
exports.validate=validategenre;