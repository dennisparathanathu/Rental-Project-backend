const router = require('express').Router();
const productModel = require('../../models/AllProduct')

router.get('/api/products', async(request,response) =>{
    await productModel.find().exec().then(res =>{
        return response.status(200).json(res)

    }).catch(error =>{
        console.log(error);
    });    
});
module.exports = router;