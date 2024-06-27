const Product = require('../models/Product');
const asyncHandler = require('../middleware/asyncHandler');
const { productSchema, idSchema } = require('../validators/productValidators');
const {z} = require("zod");




/**
 * Get all products for a coffee shop.
 * 
 * @route GET /api/products/coffeeShop/:coffeeShopId
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.getProductsByCoffeeShop = asyncHandler(async (req, res) => {
    try {
        const {coffeeShopId} = idSchema.parse(req.params);
   
        const products = await Product.find({ coffeeShop: coffeeShopId }).populate("coffeeShop");
        res.json(products);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors.map(e => e.message).join(', ') });
        }
        throw error;
    }
});

/**
 * Create a new product.
 * 
 * @route POST /api/products
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.createProduct = asyncHandler(async (req, res) => {
    try {
        const validatedData = productSchema.parse(req.body);
        const newProduct = new Product(validatedData);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors.map(e => e.message).join(', ') });
        }
        throw error;
    }
});



/**
 * Delete a product by ID.
 * 
 * @route DELETE /api/products/:id
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.deleteProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = idSchema.parse(req.params);
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.deleteOne();
        res.json({ message: 'Product removed' });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors.map(e => e.message).join(', ') });
        }
        throw error;
    }
});
