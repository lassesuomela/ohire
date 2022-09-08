const bcrypt = require('bcrypt');
const jwt = require('../configs/jwt');
const multer = require('multer');
const userModel = require('../models/userModel');
const crypto = require('crypto');
const storages = multer.diskStorage({
    destination: "profilePictures/",
    filename: (req, file, cb) => {

        // valid mimes that match valid extensions
        let mimes = {'image/jpeg':'.jpeg', 'image/png':'.png'};

        // get the file extension
        let fileExt = mimes[file.mimetype];

        // add random characters to randomize the filename in case some one has the same file name
        let random = crypto.randomBytes(16).toString('hex')

        let finalName = file.originalname.split(fileExt)[0] + random + fileExt;
        // return filename with extension

        cb(null, finalName);
    }
})

const upload = multer(
{
    storage: storages,
    limits: {
        // 2MB file size limit
        fileSize: 1024 * 1024 * 2
    },
    fileFilter(req, file, cb) {

        // check if file is not found 
        if(!file){
            return cb("Filetype not found", false);
        }

        // valid mimes that match valid extensions
        let mimes = {'image/jpeg':'.jpeg', 'image/png':'.png'};

        // get the file extension
        let fileExt = mimes[file.mimetype];

        if(!fileExt){
            // return error if mimetype is not in ext list
            return cb("Filetype not allowed: " + file.mimetype, false);
        }

        // else return null as error
        cb(null, true);
    }
}
).single("picture")


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

const registerCompany = (req, res) => {

    let {username, password, email, company} = req.body;

    let user = {};

    if(!username || !password || !email || !company) {
        return res.json({status:"error", message: "One or more fields must be provided"});
    }

    user.username = username;
    user.email = email;
    user.company = company;

    bcrypt.hash(password, 10, (err, hash) => {

        if(err){
            console.log(err);

            return res.json({status:"error", message:err});
        }

        user.password = hash;

        userModel.addCompanyUser(user, (err, result) => {

            if(err){
    
                if(err.code === 'ER_DUP_ENTRY'){
                    return res.json({status:"error", message:"Username or email already registered"});
                }
    
                console.log(err);
                return res.json({status:"error", message:err});
            }
    
            res.json({status:"success", message:"User registered for company " + company});
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

const profile = (req, res) => {

    userModel.getProfileDataByUsername(req.username, (err, result) => {
        if(err){
            console.log(err);

            return res.json({status:"error", message:err});
        }

        res.json({status:"success", data:result[0]});
    })
}

const profileUpdate = (req, res) => {

    upload(req, res, (err) => {

        // return out if multer error
        if(err){
            console.log(err);
            return res.json({status:"error", message:err});
        }

        if(!req.file){
            return res.json({status:"error", message:"One or more fields must be provided"});
        }

        let filename = req.file.filename;

        userModel.updateProfile(filename, req.id, (err, result) => {
            if(err){
                console.log(err);
    
                return res.json({status:"error", message:err});
            }
    
            res.json({status:"success", message:"Profile updated successfully"});
        })
    })
}

module.exports = {
    register,
    login,
    authenticated,
    profile,
    registerCompany,
    profileUpdate
}