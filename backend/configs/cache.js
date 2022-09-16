const NodeCache = require('node-cache');
const cache = new NodeCache();

const checkCache = (req, res, next) => {

    let key = req.originalUrl;

    if(cache.has(key)){
        res.setHeader('X-Cache', 'HIT');
        return res.json(cache.get(key));
    }else{
        next();
    }
}

const saveCache = (key, value) => {
    cache.set(key, value);
}

const delCache = (key) => {
    cache.del(key);
}

module.exports = {
    checkCache,
    saveCache,
    delCache
}