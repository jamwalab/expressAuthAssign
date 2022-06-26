// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let indexController = require('../controllers/index');

// define the game model
//let book = require('../models/books');

//router.get('/', indexController.displayHomePage);

router.get('/', (req, res, next) => {
  console.log("here");
  res.render('index', {
    title: 'Home'
   });
});

module.exports = router;
