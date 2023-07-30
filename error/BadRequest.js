class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.status = 400;
  }
}

module.exports = BadRequest;
