const { z } = require('zod');

const productSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().optional(),
    price: z.number().nonnegative({ message: "Price must be a non-negative number" }),
    category: z.string().min(1, { message: "Category is required" }),
    coffeeShop: z.string().min(1, { message: "CoffeeShop ID is required" }),
    image: z.string().url().optional(),
});

const idSchema = z.object({
    coffeeShopId: z.string().min(1, { message: "ID is required" })
});

module.exports = {
    productSchema,
    idSchema
};
