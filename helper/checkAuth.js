const parseJwt = require('./decodeToken');
const users = require('../models/user');
module.exports = async function checkAuth(token) {
  if (token) {
    const decode = await parseJwt(token.split(" ")[1]);
    console.log(decode);
    const matchFound = await users.findById(decode.id);
    console.log(matchFound);
    return matchFound;
  } else {
    return "Unathorized";
  }
};
