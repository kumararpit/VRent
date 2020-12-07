const {Genre,validate}=require('../modules/genre');
const express=require('express');
const mongoose=require('mongoose');
const router = express.Router();

router.get('/',async(req,res)=>{
    const genres=await Genre.find().sort('name');
    res.send(genres);

});
router.post('/',async(req,res)=>{
    const{error}=validate(req.body);
    if(error)return res.status(404).send(error.details[0].message);
    let genre= new Genre({name: req.body.name});
    genre=await genre.save();
    res.send(genre);
});
router.put('/:id',async(req,res)=>{
    const {error}=validate(req.body);
    if(error)return res.status(404).send(error.details[0].message);
    const genre = await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true});
    if(!genre)return res.status(404).send('genre by given id  is not found');
    res.send(genre);
});
router.delete('/:id',async(req,res)=>{
    const genre=await Genre.findByIdAndRemove(req.params.id);
    if(!genre)return res.status(404).send(' genre with given id is not found in list');
    res.send(genre);
});
router.get ('/:id',async(req,res)=>{
        const genre = await Genre.findById(req.params.id);
        if(!genre) res.status(404).send('this genres not in list..');
        res.send(genre);
});

module.exports=router;