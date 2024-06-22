const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, enum: ['Coffee', 'Drinks', 'Food'], required: true },
    coffeeShop: { type: mongoose.Schema.Types.ObjectId, ref: 'CoffeeShop', required: true }
});

module.exports = mongoose.model('Product', productSchema);
