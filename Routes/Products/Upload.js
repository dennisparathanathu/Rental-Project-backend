const router = require('express').Router();
const cloudinary = require('cloudinary').v2;
const { request, response } = require('express');
const Formidable = require('formidable');
const productModel = require('../../models/AllProduct')
require('dotenv').config();
cloudinary.config({
    cloud_name:process.env.cloud_name,
    api_key:process.env.api_key,
    api_secret:process.env.api_secret,
})

router.post('/api/upload',(request,response) =>{
    const form = Formidable.IncomingForm();
    form.parse(request,(error,fields,files) =>{
        const {productname,owner,rentperday,rentperweek,description,addedon } = fields;
        const { image } = files;

        cloudinary.uploader.upload(image.path,{folder:'/rental-app'},async(error,results)=>{
            const image_url = results.secure_url;
            const newproduct = {
                productname,
                owner,
                rentperday,
                rentperweek,
                description,
                addedon,
                image:image_url

            }
            const product = productModel(newproduct);
            const savedproduct = await product.save();
            return response.status(201).json({msg:'Product added'});

        })
    })
})
module.exports = router;

