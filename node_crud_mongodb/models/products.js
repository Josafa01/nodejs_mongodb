const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    stock: {
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required:true
    }
},{timestamps:false});

const product = mongoose.model('product', productSchema);
module.exports = product;