const express = require('express');
const router = express.Router();
const {getProductsByCoffeeShop,createProduct,deleteProduct} = require('../controllers/productController');
const validateRequest = require('../middleware/validateRequest');
const { productSchema } = require('../validators/productValidators');

router.get('/coffeeShop/:coffeeShopId', getProductsByCoffeeShop);
router.post('/', validateRequest(productSchema), createProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
