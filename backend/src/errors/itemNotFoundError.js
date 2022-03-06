module.exports = class ItemNotFoundError extends Error {
  constructor(...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ItemNotFoundError);
    }
    this.status = 404;
    this.message = 'Item has not found.';
  }
};
