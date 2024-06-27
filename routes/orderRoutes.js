const express = require('express');
const router = express.Router();
const {checkout,paymentVerify} = require('../controllers/OrderController');


router.post('/checkout', checkout);
router.post('/payment-verify', paymentVerify);


module.exports = router;
