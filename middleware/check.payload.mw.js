const createError = require("http-errors");

module.exports.checkPayload = async (req, res, next) => {
    if (!req.body.payload) {
        const error = createError(400, 'Payload object is missing');
        return next(error);
    }
    next();

}