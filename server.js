const express = require('express');
const cors =require('cors');
const mongoose = require('mongoose');

const authrouter = require('./Routes/Auth/Auth');
const productroute = require('./Routes/Products/Upload')
require('dotenv').config();


const app = express();
app.use(cors());

//database connection
const mongoURI = process.env.mongoURI;
const mongoEssentials = {useNewUrlParser:true, useUnifiedTopology:true,useCreateIndex:true}
mongoose.connect(mongoURI, mongoEssentials, (error)=>{
    if(error){
        console.log(error);
    }
    console.log("connection to Mongodb established successfully");
});
app.get('/',(req,res)=>{
    res.status(200).json({msg:"welcome to rental web server"})
})
const authroute = require('./Routes/Auth/Auth');
app.use(require('./Routes/Auth/Auth'));
app.use(require('./Routes/Products/Upload'));
app.use(require('./Routes/Fetch/Fetch'));


const PORT = process.env.PORT || 5000;
app.listen(PORT,() =>{
    console.log(`server started at port ${PORT}`);
})
