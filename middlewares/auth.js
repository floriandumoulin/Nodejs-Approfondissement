const UnauthorizedError = require("../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../config");
const UserService = require('../api/users/users.service');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      throw "not token";
    }
    const decoded = jwt.verify(token, config.secretJwtToken);
    const user = await UserService.get(decoded.userId);
    if (!user) {
      throw "User not found";
    }
    req.user = user;
    next();
  } catch (message) {
    next(new UnauthorizedError(message));
  }
};
 
