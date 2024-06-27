const express = require('express');
const router = express.Router();
const {getAllCoffeeShops,getCoffeeShopById,createCoffeeShop,updateCoffeeShop,deleteCoffeeShop} = require('../controllers/coffeeShopController');
const validateRequest = require('../middleware/validateRequest');
const { coffeeShopSchema } = require('../validators/coffeeShopValidators');

router.get('/', getAllCoffeeShops);
router.get('/:id', getCoffeeShopById);
router.post('/', validateRequest(coffeeShopSchema), createCoffeeShop);
router.put('/:id', validateRequest(coffeeShopSchema.partial()), updateCoffeeShop);
router.delete('/:id', deleteCoffeeShop);

module.exports = router;
