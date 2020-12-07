const {Rental,validate}=require('../modules/Rental');
const { Customer}= require('../modules/Customer');
const {Movie}= require('../modules/movie');
const express=require('express');
const mongoose=require('mongoose');
const router = express.Router();
router.get('/',async(req,res)=>{
    const rentals=await Rental.find().sort('name');
    res.send(rentals);
});
router.post('/',async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    const customer= await Customer.findById(req.body.customerId);
    if(!customer) return res.status(404).send('Invalid Customer...');

    const movie= await Movie.findById(req.body.movieId);
    if(!movie) return res.status(404).send('Invalid movie...');

    if(movie.numberinstock===0) return res.send('out of stock..');

    let rental = new Rental({
        customer:{
            _id: Customer._id,
            name:Customer.name,
            Phone:Customer.Phone
        },
        movie:{
            _id:Movie._id,
            title:Movie.title,
            dailyRentalRate: Movie.dailyRentalRate
        },

    });
    rental=await rental.save();
    movie.numberinstock--;
    movie.save();
    res.send(rental);
});
module.exports=router;