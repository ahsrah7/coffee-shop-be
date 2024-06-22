const express = require('express');
const router = express.Router();
const {
    getProductsByCoffeeShop,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

router.route('/coffeeShop/:coffeeShopId')
    .get(getProductsByCoffeeShop);

router.route('/')
    .post(createProduct);

router.route('/:id')
    .put(updateProduct)
    .delete(deleteProduct);

module.exports = router;
