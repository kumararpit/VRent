const{Customer,validate}=require('../modules/Customer');
const express=require('express');
const mongoose=require('mongoose');
const router = express.Router();
router.get('/',async(req,res)=>{
    const Customers=await Customer.find().sort('name');
    res.send(Customers);

});
router.post('/',async(req,res)=>{
    const{error}=validate(req.body);
    if(error)return res.status(404).send(error.details[0].message);
    let Customers= new Customer({
        name: req.body.name,
        phone:req.body.phone,
        isGold:req.body.isGold
    });
    Customers=await Customers.save();
    res.send(Customers);
});
router.put('/:id',async(req,res)=>{
    const {error}=validate(req.body);
    if(error)return res.status(404).send(error.details[0].message);
    const Customers = await Customer.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        phone:req.body.phone,
        isGold:req.body.isGold
    },{new:true});
    if(!Customers)return res.status(404).send('genre by given id  is not found');
    res.send(Customers);
});
router.delete('/:id',async(req,res)=>{
    const Customers=await Customer.findByIdAndRemove(req.params.id);
    if(!Customers)return res.status(404).send(' genre with given id is not found in list');
    res.send(Customers);
});
router.get ('/:id',async(req,res)=>{
    const Customers = await Customer.findById(req.params.id);
    if(!Customers) res.status(404).send('this genres not in list..');
    res.send(Customers);
});
module.exports= router;