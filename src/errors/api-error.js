class ApiError {
  constructor(code, message) {
    this.message = message;
    this.code = code;
  }
  static badRequest(message, code) {
    return new ApiError(code, message);
  }
}
module.exports = ApiError;
