const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    price: {
        type: Number,
        require: true,

    },
    image: String, 
    description: String,
    category: String,
    rating: Number,
    supply: Number,
    
  },
{timestamps: true}); // to create a date and update a date

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;

