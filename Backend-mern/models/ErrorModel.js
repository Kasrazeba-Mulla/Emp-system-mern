class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); // to call the constructor of the base class. this is done to add a message property to the objects of this class
    this.code = errorCode; // add code property to the obj of this class
  }
}
module.exports = HttpError;