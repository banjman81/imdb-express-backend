var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.json({
    message: "Success",
    location: 'home'
  });
});

module.exports = router;
