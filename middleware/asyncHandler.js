/**
 * A higher-order function to wrap async route handlers and middleware
 * in order to catch any errors and pass them to the next middleware.
 * 
 * @param {Function} fn - The async function (route handler/middleware) to wrap.
 * @returns {Function} A wrapped function with error handling.
 */
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        console.error(`Error in ${fn.name}:`, err.message);
        next(err);  // Pass the error to the next middleware
    });
};

module.exports = asyncHandler;
