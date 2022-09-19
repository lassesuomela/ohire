const NodeCache = require('node-cache');
const cache = new NodeCache({stdTTL:300});

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

const deleteCache = () => {

    console.log("Keys: " + cache.keys());

    cache.del(cache.keys());

    console.log("Keys: " + cache.keys());
}

module.exports = {
    checkCache,
    saveCache,
    deleteCache
}