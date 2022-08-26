const multer = require('multer');
const applicationModel = require('../models/applicationModel');
const crypto = require('crypto');
const path = require('path');


const storages = multer.diskStorage({
    destination: "applications/",
    filename: (req, file, cb) => {

        // valid mimes that match valid extensions
        let mimes = {'application/pdf':'.pdf'};

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
        // 5MB file size limit
        fileSize: 1024 * 1024 * 5
    },
    fileFilter(req, file, cb) {

        // check if file is not found 
        if(!file){
            return cb("Filetype not found", false);
        }

        // valid mimes that match valid extensions
        let mimes = {'application/pdf':'pdf'};

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
).single("file")

const sendApplication = (req, res) => {

    upload(req, res, (err) => {

        // return out if multer error
        if(err){
            console.log(err);
            return res.json({status:"error", message:err});
        }

        let application, jobId;

        try {
            let body = JSON.parse(req.body.data);

            application = body.application;
            jobId = body.jobId;
        }catch(e){
            console.log(e);
            return res.json({status:"error", message:"Unable to parse JSON"});
        }
        
        if(!application || !jobId || !req.file){
            return res.json({status:"error", message:"One or more fields must be provided"});
        }

        let filename = req.file.filename;

        let data = {
            application: application,
            users_id: req.id,
            joblistings_id: jobId,
            cvFile: filename,
            applicationFile: ''
        };

        applicationModel.add(data, (err, result) => {
            if(err){
                console.log(err);
    
                return res.json({status:"error", message:err});
            }
    
            return res.json({status:"success", message:"Application submitted"});
        })
    })
}

const getUsersApplications = (req, res) => {

    applicationModel.getByUsersId(req.id, (err, result) => {
        if(err){
            console.log(err);

            return res.json({status:"error", message:err});
        }

        if(result.length > 0){
            return res.json({status:"success", count:result.length, data:result});
        }else{
            return res.json({status:"error", message:"Applications not found"});
        }

    })
}

const getApplicationsByJobId = (req, res) => {

    if(req.role === 1){
        return res.json({status:"error", message:"Account type needs to be Corporate User or higher"});
    }

    applicationModel.getByJobId(req.params.id, req.id, (err, result) => {
        if(err){
            console.log(err);

            return res.json({status:"error", message:err});
        }

        if(result.length > 0){
            return res.json({status:"success", count:result.length, data:result});
        }else{
            return res.json({status:"error", message:"Applications not found for that job id"});
        }
    })
}

const getApplicationById = (req, res) => {

    if(req.role === 1){
        return res.json({status:"error", message:"Account type needs to be Corporate User or higher"});
    }

    applicationModel.getByApplicationId(req.params.id, req.params.jobId, req.id, (err, result) => {
        if(err){
            console.log(err);

            return res.json({status:"error", message:err});
        }

        if(result.length > 0){
            return res.json({status:"success", data:result});
        }else{
            return res.json({status:"error", message:"Application not found for that id"});
        }
    })
}

const reviewApplication = (req, res) => {

    let {rating, applicationId, applicationUsersId, jobId} = req.body;

    if(!rating || !jobId || !applicationId || !applicationUsersId) {
        return res.json({status:"error", message: "One or more fields must be provided"});
    }

    if(rating === "0"){
        reviewed = 0;
    }else{
        reviewed = 1;
    }

    applicationModel.review(rating, applicationId, jobId, applicationUsersId, req.id, reviewed, (err, result) => {
        if(err){
            console.log(err);

            return res.json({status:"error", message:err});
        }

        return res.json({status:"success", message:"Application reviewed"});
        
    })
}

const getCV = (req, res) => {

    if(req.role === 1){
        return res.json({status:"error", message:"Account type needs to be Corporate User or higher"});
    }

    let {applicationId, applicationUsersId, jobId} = req.params;

    if(!jobId || !applicationId || !applicationUsersId) {
        return res.json({status:"error", message: "One or more fields must be provided"});
    }

    applicationModel.getCVByIds(jobId, req.id, applicationUsersId, applicationId, (err, result) => {
        if(err){
            console.log(err);

            return res.json({status:"error", message:err});
        }

        let filename = result[0].cvFile;

        //filename = filename.slice(0, filename.length - 32);

        return res.sendFile(filename, {root: "./applications"});
    })
}

module.exports = {
    sendApplication,
    getUsersApplications,
    getApplicationsByJobId,
    getApplicationById,
    reviewApplication,
    getCV
}