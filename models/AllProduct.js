const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productname: { type:String,required:true},
    owner: { type:String,require:true},
    description:{type:String,required:true},
    rentperday:{type:Number,required:true},
    rentperweek:{type:Number},
    image:{type:String,required:true},
    addedon:{type:Date,default:Date.now}
});

const productModel = mongoose.model('productModel',productSchema)

module.exports = productModel;
