const jobsModel = require('../models/jobsModel');

const create = (req, res) => {

    let {title, description, salary, workingTime} = req.body;

    if(!title || !description || !workingTime) {
        return res.json({status:"error", message: "One or more fields must be provided"});
    }

    let data = {
        title: title, 
        description: description,
        salary: salary,
        users_id:req.id,
        workingTime:workingTime
    };

    jobsModel.add(data, (err, result) => {

        if(err){
            console.log(err);
            return res.json({status:"error", message:err});
        }

        res.json({status:"success", message:"Job listing saved"});
    })
}

const getNAmountOfPostings = (req, res) => {

    // % throws urierror failed to decode param
    let {page, filter} = req.params;

    if(!filter){
        filter = '';
    }

    if(!page){
        return res.json({status:"error",message:"Page number is required"});
    }

    let perPageCount = 10; 
    let maxRecordCount = 0;
    let currentPage = 0;
    let maxPage = 0;

    jobsModel.getCount(filter, (err, result) => {

        if(err){
            console.log(err);
            return res.json({status:"error", message:err});
        }

        if(!result) {
            return res.json({status:"error", message:"No job listings found"});
        }

        maxRecordCount = result[0].maxCount;

        if(maxRecordCount === 0) {
            return res.json({status:"error", message:"No job listings found"});
        }

        maxPage = Math.ceil(maxRecordCount/perPageCount);

        if(page <= 0 || page > maxPage){
            return res.json({status:"error",message:"Page number out of scope"});
        }

        currentPage = (page - 1) * perPageCount;

        jobsModel.getNAmountOfPostings(filter, currentPage, (err, result) => {

            if(err){
                console.log(err);
                return res.json({status:"error", message:err});
            }

            res.json({status:"success", maxPageAmount: maxPage, data:result, count: maxRecordCount})

        })
    })
}

const getById = (req, res) => {

    let id = req.params.id;

    if(!id){
        return res.json({status:"error",message:"Job id number is required"});
    }

    jobsModel.getById(id, (err, result) => {

        if(err){
            console.log(err);
            return res.json({status:"error", message:err});
        }

        if(!result) {
            return res.json({status:"error", message:"No job listings found for that id"});
        }

        res.json({status:"success", data:result[0]})
    })
}

module.exports = {
    create,
    getNAmountOfPostings,
    getById,
    
}