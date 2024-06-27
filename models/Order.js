const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: { type: String },
    amount:{type:Number},
    order_id:{type:String},
    razorpay_payment_id:{type:String,default:null},
    razorpay_order_id:{type:String,default:null},
    razorpay_signature:{type:String,default:null}

});

module.exports = mongoose.model('Order', orderSchema);
