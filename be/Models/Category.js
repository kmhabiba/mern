const mongoose = require('mongoose');
 
const categorySchema = new mongoose.Schema({
  category_id: { 
    type: String, 
    required: true, 
    unique: true ,
    default:() => new mongoose.Types.ObjectId(),
    },

  name: {
    type: String, 
    required: true 
},

  image: { 
    type: String 
},

});
 
module.exports = mongoose.model('Category', categorySchema);