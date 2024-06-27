const CoffeeShop = require('../models/CoffeeShop');
const asyncHandler = require('../middleware/asyncHandler');
const { coffeeShopSchema,idSchema } = require('../validators/coffeeShopValidators');
const {z} = require("zod");
/**
 * Get all coffee shops.
 * 
 * @route GET /api/coffeeShops
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.getAllCoffeeShops = asyncHandler(async (req, res) => {
    const coffeeShops = await CoffeeShop.find();
    res.json(coffeeShops);
});


/**
 * Get a coffee shop by ID.
 * 
 * @route GET /api/coffeeShops/:id
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.getCoffeeShopById = asyncHandler(async (req, res) => {
    try {
        const { id } = idSchema.parse(req.params);
        const coffeeShop = await CoffeeShop.findById(id);
        if (!coffeeShop) {
            return res.status(404).json({ message: 'Coffee shop not found' });
        }
        res.json(coffeeShop);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors.map(e => e.message).join(', ') });
        }
        throw error;
    }
});

/**
 * Create a new coffee shop.
 * 
 * @route POST /api/coffeeShops
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.createCoffeeShop = asyncHandler(async (req, res) => {
    try {
        const validatedData = coffeeShopSchema.parse(req.body);
        const newCoffeeShop = await CoffeeShop.findOneAndUpdate(
            { name: validatedData.name },
            validatedData,
            { upsert: true, new: true }
          );
      
        res.status(201).json(newCoffeeShop);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors.map(e => e.message).join(', ') });
        }
        throw error;
    }
});

/**
 * Update a coffee shop by ID.
 * 
 * @route PUT /api/coffeeShops/:id
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.updateCoffeeShop = asyncHandler(async (req, res) => {
    try {
        const validatedData = coffeeShopSchema.partial().parse(req.body);
        const { id } = idSchema.parse(req.params);
        const coffeeShop = await CoffeeShop.findById(id);

        if (!coffeeShop) {
            return res.status(404).json({ message: 'Coffee shop not found' });
        }

        Object.assign(coffeeShop, validatedData);
        const updatedCoffeeShop = await coffeeShop.save();
        res.json(updatedCoffeeShop);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors.map(e => e.message).join(', ') });
        }
        throw error;
    }
});

/**
 * Delete a coffee shop by ID.
 * 
 * @route DELETE /api/coffeeShops/:id
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.deleteCoffeeShop = asyncHandler(async (req, res) => {
    try {
        const { id } = idSchema.parse(req.params);
        const coffeeShop = await CoffeeShop.findById(id);

        if (!coffeeShop) {
            return res.status(404).json({ message: 'Coffee shop not found' });
        }

        await coffeeShop.deleteOne();
        res.json({ message: 'Coffee shop removed' });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors.map(e => e.message).join(', ') });
        }
        throw error;
    }
});