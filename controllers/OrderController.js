const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require('../models/Order');
const asyncHandler = require('../middleware/asyncHandler');


let razorpay = new Razorpay({
  key_id : process.env.razorpay_key_id ,
  key_secret:process.env.razorpay_key_secret,
})

/**
 * 
 * @route GET /api/orders/checkout
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.checkout = asyncHandler(async (req, res) => {
    try {
       const {name,amount} = req.body;

       const order = await razorpay.orders.create({
        amount:Number(amount*100),
        currency:'INR'
       })

       await Order.create({
        order_id:order.id,
        name:name,
        amount:amount,

       })

       res.json(order)
    } catch (error) {
        throw error;
    }
});

exports.paymentVerify =  asyncHandler(async (req, res) => {
  try {

     const {razorpay_payment_id,razorpay_order_id,razorpay_signature} = req.body;
    console.log(req.body);
     const body_data = razorpay_order_id+"|"+razorpay_payment_id;
     const expect = crypto.createHmac("sha256",process.env.razorpay_key_secret)
     .update(body_data).digest("hex");
     const isValid = expect === razorpay_signature;
     if(isValid){
      await Order.findOneAndUpdate({order_id:razorpay_order_id},
        { razorpay_payment_id,razorpay_order_id,razorpay_signature},
        {new:true} 
      )
      res.redirect(`${process.env.REDIRECT_URL}/success?payment_id=${razorpay_payment_id}`);
      return
     }else{
      res.redirect(`${process.env.REDIRECT_URL}/failed`)
      return
     }
  } catch (error) {
      throw error;
  }
});
