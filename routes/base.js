var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Base = require('../models/Base.js');

// get all bases
router.get('/', function(req, res, next) {
  Base.find(function(err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

// get single base id
router.get('/:id', function(req, res, next) {
  Base.findById(req.params.id, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// save base
router.post('/', function(req, res, next) {
  Base.create(req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// update base
router.put('/id', function(req, res, next) {
  Base.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.jston(post);
  });
});

// delete base
router.delete('/:id', function(req, res, next) {
  Base.findByIdAndRemove(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.export = router;

module.exports = router;
