const { z } = require('zod');

const validateRequest = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors.map(e => e.message).join(', ') });
        }
        next(error);
    }
};

module.exports = validateRequest;
