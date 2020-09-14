const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
require('dotenv').config();// need this to read .env file

const app = express();
const port = process.env.PORT || 5000;

//#region MIDDLEWARE
app.use(cors());
app.use(express.json());
//#endregion

let uri = process.env.ATLAS_URI; //link to Database
uri = "mongodb://localhost/CRUDAPP";
mongoose.connect(uri, {useNewUrlParser :true, useCreateIndex: true, useUnifiedTopology: true })

//setting up connectio
const connect = mongoose.connection;
connect.on("error", console.error.bind(console, "connection error:"));
connect.then('open', ()=>{
    console.log("db connection is established.");
})  ;

const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users');

app.use('/exercises',exerciseRouter);
app.use('/users', userRouter);

//37:00
app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
});