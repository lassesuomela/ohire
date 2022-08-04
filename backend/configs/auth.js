require('dotenv').config();

let jwt = require('./jwt');

const auth = (req, res, next) => {

    let authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.json({status:"error", message:"JWT token is required"});
    }

    let apiKey = authHeader.split(' ')[1];

    jwt.verifyToken(apiKey, (err, result) => {
        if(err) {
            console.log(err);

            return res.json({status:"error", message:err});
        }

        // save tokens data to req for future use on other controllers

        req.id = result.id;
        req.username = result.username;
        req.role = result.role;

        next();
    })

}

module.exports = auth;