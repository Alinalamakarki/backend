const sendRespondWithStatus = (res, status, message) => {
  res.status(status).json({ message });
};

module.exports = { sendRespondWithStatus };
