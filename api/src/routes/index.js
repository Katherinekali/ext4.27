var express = require('express');
var router = express.Router();
let { getData, addData } = require("./indexapi")

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/getData', getData);
router.post('/addData', addData);

module.exports = router;