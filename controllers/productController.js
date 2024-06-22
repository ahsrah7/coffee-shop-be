const Product = require('../models/Product');
const asyncHandler = require('../middleware/asyncHandler');

/**
 * Get all products for a coffee shop.
 * 
 * @route GET /api/products/coffeeShop/:coffeeShopId
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.getProductsByCoffeeShop = asyncHandler(async (req, res) => {
    const products = await Product.find({ coffeeShop: req.params.coffeeShopId });
    res.json(products);
});

/**
 * Create a new product.
 * 
 * @route POST /api/products
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.createProduct = asyncHandler(async (req, res) => {
    const { name, price, category, coffeeShop } = req.body;
    const newProduct = new Product({
        name,
        price,
        category,
        coffeeShop
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
});

/**
 * Update a product by ID.
 * 
 * @route PUT /api/products/:id
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.updateProduct = asyncHandler(async (req, res) => {
    const { name, price, category, coffeeShop } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.category = category || product.category;
    product.coffeeShop = coffeeShop || product.coffeeShop;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
});

/**
 * Delete a product by ID.
 * 
 * @route DELETE /api/products/:id
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    await product.remove();
    res.json({ message: 'Product removed' });
});
