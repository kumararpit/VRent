const genres=require('./routes/genres');
const customers=require('./routes/customers');
const movies=require('./routes/movies');
const Registeruser=require('./routes/Register');
const mongoose=require('mongoose');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/vidly')
.then(()=>console.log('mongoDB connected...'))
.catch(err=>console.error('mongoDB not connected...'));

app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/register',Registeruser);

const port = process.env.PORT||3000;
app.listen(port,()=>console.log(`listening to port ${port}`));