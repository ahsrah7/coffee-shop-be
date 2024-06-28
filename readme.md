coffee-shop-be/
├── models/
│ ├── CoffeeShop.js
│ ├── Product.js
│ ├── Order.js
├── controllers/
│ ├── coffeeShopController.js
│ ├── productController.js
│ ├── orderController.js
├── routes/
│ ├── coffeeShopRoutes.js
│ ├── productRoutes.js
│ ├── orderRoutes.js
├── middleware/
│ ├── asyncHandler.js
│ ├── validateRequest.js
├── validators/
│ ├── coffeeShopValidators.js
│ ├── produtValidators.js
├── config/
│ ├── db.js
├── .env.development
├── app.js


## env configuration
MONGO_URI=mongodb+srv://<username>:<password>@mongodb.net/coffeeShop?retryWrites=true&w=majority&appName=Cluster0
razorpay_key_secret=RAZORPAY_SECRET
razorpay_key_id=RAZORPAY_KEY_ID
REDIRECT_URL=RAZORPAY_CALLBACK_URL


app setup
1.clone the coffee-shop-be and cd into the folder
2.open a terminal for the current directory and run "npm install".

To start the app run the command "npm run dev"

POSTMAN  COLLECTION  Link - https://drive.google.com/file/d/1K3ImqoMqc-3NnH2oZedUI57Xf99NfrvJ/view?usp=sharing
