const applicationModel = require('../models/applicationModel');

const sendApplication = (req, res) => {

    let {application, jobId} = req.body;

    if(!application || !jobId) {
        return res.json({status:"error", message: "One or more fields must be provided"});
    }

    let data = {
        application: application,
        users_id: req.id,
        joblistings_id: jobId,
        cvFile: '',
        applicationFile: ''
    }

    applicationModel.add(data, (err, result) => {
        if(err){
            console.log(err);

            return res.json({status:"error", message:err});
        }

        return res.json({status:"success", message:"Application submitted"});
        
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

    console.log(req.params.id);
    console.log(req.id);

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

    applicationModel.getByApplicationId(req.params.id, req.params.jobId, (err, result) => {
        if(err){
            console.log(err);

            return res.json({status:"error", message:err});
        }

        if(result.length > 0){
            return res.json({status:"success", data:result});
        }else{
            return res.json({status:"success", message:"Application not found for that id"});
        }
    })
}


module.exports = {
    sendApplication,
    getUsersApplications,
    getApplicationsByJobId,
    getApplicationById
}