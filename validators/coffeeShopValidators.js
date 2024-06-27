const { z } = require('zod');

const coffeeShopSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().optional(),
    location: z.string().optional(),
    distance: z.number().optional(),
    ratings: z.number().optional(),
    reviews: z.number().optional(),
    coverImage: z.string().url().optional(),
    sliderImages: z.array(z.string().url()).optional(),
});

const idSchema = z.object({
    id: z.string().min(1, { message: "ID is required" })
});

module.exports = {
    coffeeShopSchema,
    idSchema
};
