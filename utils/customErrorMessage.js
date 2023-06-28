const ERROR = (status, message) => {
  err = new Error();
  err.status = status;
  err.message = message;
  return err;
};
module.exports = ERROR;
