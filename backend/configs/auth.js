require('dotenv').config();

let jwt = require('./jwt');

const auth = (req, res, next) => {
    //Todo: verify jwt token

    let authHeader = req.headers.authorization;

    console.log(authHeader);

    if(!authHeader) {
        return res.json({status:"error", message:"JWT token is required"});
    }

    let apiKey = authHeader.split(' ')[1];

    console.log(apiKey);

    jwt.verifyToken(apiKey, (err, result) => {
        if(err) {
            console.log(err);

            return res.json({status:"error", message:err});
        }

        console.log(result);
    })

}

module.exports = auth;