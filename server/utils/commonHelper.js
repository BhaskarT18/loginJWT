const sendSuccessResponse = (res, status, statusText, message, data = null) => {
    return res.status(status).json({ statusText, message, data });
  };
  
  const sendErrorResponse = (res, status, statusText, message) => {
    return res.status(status).json({ statusText, message });
  };
  
  module.exports = { sendSuccessResponse, sendErrorResponse };

  