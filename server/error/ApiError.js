class ApiError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }

    static forbidden (message) {
        return new ApiError(403, message )
    }

    static badRequest(message) {
        return new ApiError(404, message )
    }

    static internal(message) {
        return new ApiError(500, message )
    }
}

module.exports = ApiError;