const ApiError = require('../error/ApiError');

module.exports = (err, req, res, next) => {
    if(err instanceof ApiError) {
        return res.status(err.status || 500).json({message: err.message || 'Че то новое'});
    }
}