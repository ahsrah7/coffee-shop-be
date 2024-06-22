const mongoose = require('mongoose');

const coffeeShopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    location: String,
    distance:Number,
    ratings: { type: Number, default: 0 },
    image: String,  // URL or path to the image
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

module.exports = mongoose.model('CoffeeShop', coffeeShopSchema);
