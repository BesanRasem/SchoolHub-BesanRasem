class ApiError extends Error {
    constructor(message, statusCode = 500, details = null) {
        super(message);//بمرر المسج للسوبر كلاس 
        this.statusCode = statusCode;
        this.details = details;
    }
}

module.exports = ApiError;
