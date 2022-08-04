const bcrypt = require('bcrypt');
const jwt = require('../configs/jwt');

const userModel = require('../models/userModel');

const register = (req, res) => {

    let {username, password, email} = req.body;

    let user = {};

    if(!username || !password || !email) {
        return res.json({status:"error", message: "One or more fields must be provided"});
    }

    user.username = username;
    user.email = email;

    bcrypt.hash(password, 10, (err, hash) => {

        if(err){
            console.log(err);

            return res.json({status:"error", message:err});
        }

        user.password = hash;

        userModel.addUser(user, (err, result) => {

            if(err){
    
                if(err.code === 'ER_DUP_ENTRY'){
                    return res.json({status:"error", message:"Username or email already registered"});
                }
    
                console.log(err);
                return res.json({status:"error", message:err});
            }
    
            res.json({status:"success", message:"User registered"});
        })
    })
}

const login = (req, res) => {

    let {username, password} = req.body;

    if(!username || !password){
        return res.json({status:"error", message: "One or more fields must be provided"});
    }

    userModel.getPasswordByUsername(username, (err, result) => {
        if(err){
            console.log(err);

            return res.json({status:"error", message:err});
        }

        if(!result[0]){
            return res.json({status:"error", message:"Invalid username or password"});
        }

        bcrypt.compare(password, result[0].password, (err, result) => {
            if(err){
                console.log(err);
    
                return res.json({status:"error", message:err});
            }

            if(!result){
                return res.json({status:"error", message:"Invalid username or password"});
            }

            userModel.getByUsername(username, (err, result) => {
                if(err){
                    console.log(err);
        
                    return res.json({status:"error", message:err});
                }

                if(!result){
                    return res.json({status:"error", message:"Invalid username or password"});
                }

                // create jwt token and send it to user

                let createdToken = jwt.createToken(result[0].id, result[0].username, result[0].role);

                res.json({status:"success", message:"Login success", token:createdToken});
            })
        })
    })
}

const authenticated = (req, res) => {
    res.json({status:"success", message:"Authenticated"});
}

module.exports = {
    register,
    login,
    authenticated
}