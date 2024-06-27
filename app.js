const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const coffeeShopRoutes = require('./routes/coffeeShopRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require("./routes/orderRoutes");

// Log the environment
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

// Load environment variables
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

console.log(`MONGO_URI: ${process.env.MONGO_URI}`);

connectDB();


const app = express();
app.use(express.json());

app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', 'http://13.202.98.102/');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
    
  })




app.use('/api/coffeeShops', coffeeShopRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
