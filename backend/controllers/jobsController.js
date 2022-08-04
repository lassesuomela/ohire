const jobsModel = require('../models/jobsModel');

const create = (req, res) => {

    let {title, description} = req.body;

    if(!title || !description) {
        return res.json({status:"error", message: "One or more fields must be provided"});
    }

    let data = {
        title: title, 
        description: description,
        users_id:req.id
    };

    jobsModel.add(data, (err, result) => {

        if(err){
            console.log(err);
            return res.json({status:"error", message:err});
        }

        res.json({status:"success", message:"Job listing saved"});
    })
}

module.exports = {
    create,
    
}