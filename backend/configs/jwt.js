const jwt = require('jsonwebtoken');

const createToken = (username, role) => {
    return jwt.sign({username:username, role:role}, process.env.TOKEN, {expiresIn:'12h'});
}

const verifyToken = (token, cb) => {
    jwt.verify(token, process.env.TOKEN, (err, result) => {
        cb(err, result);
    })
}

module.exports = {
    createToken,
    verifyToken
}