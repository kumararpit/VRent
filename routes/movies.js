const express=require('express');
const mongoose=require('mongoose');
const {Genre}=require('../modules/genre');
const {Movie, validate} = require('../modules/movie');

const router = express.Router();
router.get('/', async(req,res)=>{
    const movies= await Movie.find().sort('name');
    res.send(movies);
});
router.post('/',async(req,res)=>{
    const {error}= validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);
    const genre= await Genre.findById(req.body.genreID);
    if(!genre) return res.send('Invalid genre');
    let movie= Movie({
        title: req.body.title,
        genre:{
            _id: genre._id,
            name:genre.name
        },
        numberinstock:req.body.numberinstock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    movie=await movie.save();
});
module.exports=router;