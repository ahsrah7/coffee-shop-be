const mongoose = require('mongoose');

const coffeeShopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    location: String,
    distance: Number,
    ratings: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    coverImage: String,  
    sliderImages: [String], 
});


// Middleware to handle deletion of associated products
coffeeShopSchema.pre('deleteOne', { document: true } ,async function(next) {
    try {
        const coffeeShop = this; 
        const products = await mongoose.model('Product').deleteMany({ coffeeShop: coffeeShop._id });
        console.log(`Deleted ${products.deletedCount} products associated with coffee shop ${coffeeShop._id}`);
        next();
    } catch (err) {
        next(err);
    }
});
module.exports = mongoose.model('CoffeeShop', coffeeShopSchema);
