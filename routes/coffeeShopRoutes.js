const express = require('express');
const router = express.Router();
const {
    getAllCoffeeShops,
    getCoffeeShopById,
    createCoffeeShop,
    updateCoffeeShop,
    deleteCoffeeShop
} = require('../controllers/coffeeShopController');

router.route('/')
    .get(getAllCoffeeShops)
    .post(createCoffeeShop);

router.route('/:id')
    .get(getCoffeeShopById)
    .put(updateCoffeeShop)
    .delete(deleteCoffeeShop);

module.exports = router;
