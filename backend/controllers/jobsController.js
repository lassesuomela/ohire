const jobsModel = require('../models/jobsModel');
const cache = require('../configs/cache');

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

            let data = {status:"success", maxPageAmount: maxPage, data:result, count: maxRecordCount};

            let key = req.originalUrl;

            cache.saveCache(key, data);
            res.json(data);

        })
    })
}

const getCompanysPostings = (req, res) => {

    // % throws urierror failed to decode param
    let {page} = req.params;

    if(!page){
        return res.json({status:"error",message:"Page number is required"});
    }

    let perPageCount = 10; 
    let maxRecordCount = 0;
    let currentPage = 0;
    let maxPage = 0;

    jobsModel.getCompanysPostingCount(req.id, (err, result) => {

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

        jobsModel.getNAmountOfCompanyPostings(req.id, currentPage, (err, result) => {

            if(err){
                console.log(err);
                return res.json({status:"error", message:err});
            }

            let key = req.originalUrl;

            cache.delCache(key);

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

        let data = {status:"success", data:result[0]};

        let key = req.originalUrl;

        cache.saveCache(key, data);
        res.json(data);
    })
}

const deleteById = (req, res) => {

    let {id} = req.params;

    if(!id){
        return res.json({status:"error",message:"Job id is required"});
    }

    jobsModel.deleteById(req.id, id, (err, result) => {

        if(err){
            console.log(err);
            if(err.code === "ER_ROW_IS_REFERENCED_2"){
                return res.json({status:"error", message:"Unable to delete the job because meeting is reserved for it"});
            }
            return res.json({status:"error", message:err});
        }

        if(!result) {
            return res.json({status:"error", message:"No job listings found for that id"});
        }

        let key = req.originalUrl;

        cache.delCache(key);

        res.json({status:"success", message:"Job deleted"})
    })
}

module.exports = {
    create,
    getNAmountOfPostings,
    getCompanysPostings,
    getById,
    deleteById
}