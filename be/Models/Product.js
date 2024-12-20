const mongoose = require('mongoose');
 
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {    
    type: String,
    required: true,
  },
  quantity:{
    type:Number,
    required:true,
  },
  category:{
    type:String,
    required:true,
    enum:["fruits" , "veggies" ,"flour" , "snacks"]
  }
});
 
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
