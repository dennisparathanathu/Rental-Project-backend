const  userModel  = require('../../models/User');
const Bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
require('dotenv').config();
const express = require('express');

const router = express.Router();
const Formidable = require('formidable');


router.post('/api/user-registration',(request,response) =>{
    const form = new Formidable.IncomingForm();
    form.parse(request, async(error,fields, files)=>{
        console.log(fields);
        const { name, email, password, verifiedPassword} = fields;
        try {
            if(!email || !password || !name || !verifiedPassword){
                return response.status(400).json({msg:"All fields have to be entered"});
    
            }
            if(password.length < 5){
                return response.status(400).json({msg:'Password has to be atleast 5 character long'});
    
            }
            if(password !== verifiedPassword){
                return response.status(400).json({msg:"Password's have to match "});
            }
            const user = await userModel.findOne({email: email});
            if(user){
                return response.status(400).json({msg:"user with this email already exist"});
            }
            const salt = await Bcrypt.genSalt(15);
            const hashedPassword = await Bcrypt.hash(password,salt)
            
            const newUser = new userModel({
                name,
                email,
                password:hashedPassword,
                
            })
            const savedUser = await newUser.save();
            const  token = JWT.sign({id:savedUser._id}, process.env.jwt_secret);
            return response.status(201).json({msg:"Account successfully created",token:token,
            name:savedUser.name,email:savedUser.email
        })
            
        } catch (error) {
            console.log(error);
            return response.status(500).json({msg:"Server is currently down please try again later"});
            
        }
    });

});
router.post('/api/user-login',(reuest,response) =>{
    const form = new Formidable.IncomingForm();
    form.parse(request,async(error,fields,files) =>{
        const {email,password} = fields;
        try {
            if(!email || !password){
                return response.status(400).json({msg:"All fields have to be entered"});
            }
            const user = await userModel.FindOne({email:email});
            if(!user){
                return response.status(400).json({msg:"user with this email doesnot exist"});
            }
            const isPasswordMatch = await Bcrypt.compare(password,user.password);
            if(!isPasswordMatch){
                return response.status(400).json({msg:"Invalid credentials"});
            }
            const token = JWT.sign({id:user._id},process.env.jwt_secret);
            return response.status(200).json({msg:"Logging you in...",
            token:token,
            name:user.name,
            email:email
        });
            
        } catch (error) {
            return response.status(500).json({msg:"server is currently down please try again later"});
            
        }
    })
})

module.exports = router;