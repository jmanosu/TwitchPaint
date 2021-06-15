const router = exports.router = require('express').Router();
const { tiles } =  require('./data');

router.get('/', async function(req, res) {
    res.status(200).send(tiles());
});

router.post('/', async function(req, res) {
    res.status(200).send({
        success: true
    });
});