const jwt = require('jsonwebtoken');

const createToken = (id, username, role) => {
    return jwt.sign({id:id, username:username, role:role}, process.env.TOKEN, {expiresIn:'1h'});
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