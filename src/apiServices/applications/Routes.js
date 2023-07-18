const router = require('express').Router();
const Applications = require('./Controller');


router.post('/', Applications.sendVariables)

module.exports = router