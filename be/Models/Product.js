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
  quantityType:{
    type:String,
    // enum:['g','kg','ml' , 'L','pcs' , 'dozen'],
    required: true,
  },
  category:{
    type:mongoose.Schema.Types.ObjectId, 
    //type:String,
    ref:'Category',
    required:true,
  }
});
 
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
