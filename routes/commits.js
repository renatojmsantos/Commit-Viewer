const express = require('express');

const commit = require('../controller/commit.js');
const router = express.Router();

// enable cache
const mcache = require('memory-cache');

const cache = (duration) => {
    return (req, res, next) => {
        let key = '__express__' + req.url;
        let cachedBody = mcache.get(key)
        if (cachedBody) {
            return res.send(cachedBody);
        } else {
            res.sendResponse = res.send
            res.send = (body) => {
                mcache.put(key, body, duration * 1000);
                res.sendResponse(body);
            }
            next();
        }
    }
}

// call controller function to handle with endpoint GET /commits, and get a cache for 10seconds.
router.get('/', cache(10), commit.retrieve);

module.exports = router;