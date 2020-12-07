const mongoose=require('mongoose');
const genres=require('./routes/genres');
const customers=require('./routes/customers');
const movies=require('./routes/movies');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/vidly')
.then(()=>console.log('mongoDB connected...'))
.catch(err=>console.error('mongoDB not connected...'));

app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);

const port = process.env.PORT||3000;
app.listen(port,()=>console.log(`listening to port ${port}`));