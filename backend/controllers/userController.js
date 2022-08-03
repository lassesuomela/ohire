const bcrypt = require('bcrypt');

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
    
}

module.exports = {
    register,
    login
}