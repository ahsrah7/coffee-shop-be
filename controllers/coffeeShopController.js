const CoffeeShop = require('../models/CoffeeShop');
const asyncHandler = require('../middleware/asyncHandler');

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
    const coffeeShop = await CoffeeShop.findById(req.params.id);
    if (!coffeeShop) {
        return res.status(404).json({ message: 'Coffee shop not found' });
    }
    res.json(coffeeShop);
});

/**
 * Create a new coffee shop.
 * 
 * @route POST /api/coffeeShops
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.createCoffeeShop = asyncHandler(async (req, res) => {
    const { name, description, location, image } = req.body;
    const newCoffeeShop = new CoffeeShop({
        name,
        description,
        location,
        image
    });
    const savedCoffeeShop = await newCoffeeShop.save();
    res.status(201).json(savedCoffeeShop);
});

/**
 * Update a coffee shop by ID.
 * 
 * @route PUT /api/coffeeShops/:id
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.updateCoffeeShop = asyncHandler(async (req, res) => {
    const { name, description, location, image } = req.body;
    const coffeeShop = await CoffeeShop.findById(req.params.id);

    if (!coffeeShop) {
        return res.status(404).json({ message: 'Coffee shop not found' });
    }

    coffeeShop.name = name || coffeeShop.name;
    coffeeShop.description = description || coffeeShop.description;
    coffeeShop.location = location || coffeeShop.location;
    coffeeShop.image = image || coffeeShop.image;

    const updatedCoffeeShop = await coffeeShop.save();
    res.json(updatedCoffeeShop);
});

/**
 * Delete a coffee shop by ID.
 * 
 * @route DELETE /api/coffeeShops/:id
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.deleteCoffeeShop = asyncHandler(async (req, res) => {
    const coffeeShop = await CoffeeShop.findById(req.params.id);

    if (!coffeeShop) {
        return res.status(404).json({ message: 'Coffee shop not found' });
    }

    await coffeeShop.remove();
    res.json({ message: 'Coffee shop removed' });
});
