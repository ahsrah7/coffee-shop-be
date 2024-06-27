const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: String,
    coffeeShop: { type: mongoose.Schema.Types.ObjectId, ref: 'CoffeeShop', required: true },
    image: String  // URL or path to the image
});

module.exports = mongoose.model('Product', productSchema);
