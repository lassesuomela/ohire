const meetingsModel = require('../models/meetingsModel');

const usersMeetings = (req, res) => {

    meetingsModel.getByUsersId(req.id, (err, result) => {
        if(err){
            console.log(err);

            return res.json({status:"error", message:err});
        }

        if(result.length > 0){
            return res.json({status:"success", data:result});
        }else{
            return res.json({status:"error", message:"Meetings not found"});
        }
    })
}


module.exports = {
    usersMeetings
}