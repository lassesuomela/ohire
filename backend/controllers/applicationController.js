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

module.exports = {
    sendApplication
}