const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.cookie.split("=")[1];
    const decoded = jwt.verify(token, process.env.secret);
    req.headers.userData = decoded;
    next();
  }
  catch(error) {
    req.headers.userData = undefined;
    next();
  }
}
