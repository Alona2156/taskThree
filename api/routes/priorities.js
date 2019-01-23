const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Priority = require('../models/priority');

var UserModel = require('./users');

router.get('/get-priorities', (req, res, next) =>{
  Priority.find({userId: UserModel.userId})
  .exec()
  .then(priorities =>{
     res.status(200).json(priorities);
  })
  .catch(error =>{
    res.status(500).json({
      error: error
    })
  });
});

router.post('/post-priorities', (req, res, next) => {
  var priorities = [
    new Priority({
      color: "red",
      level: "high",
      userId: UserModel.userId
    }),
    new Priority({
      color: "orange",
      level: "medium",
      userId: UserModel.userId
    }),
    new Priority({
      color: "yellow",
      level: "low",
      userId: UserModel.userId
    })
  ];
  for (var i = 0; i < priorities.length; i++) {
    priorities[i].save();
  }
  Priority.find({
      userId: UserModel.userId
    })
    .exec()
    .then(priorities => {
      res.status(200).json(priorities);
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
});

router.patch('/update-priority', (req, res, next) =>{
  const id = req.body._id;
  const newPriority = {
    color: req.body.color,
    level: req.body.level
  }
  Priority.update({
    _id: id
  }, {$set: newPriority})
  .exec()
  .then(function(){
    Priority.find({userId: UserModel.userId})
    .exec()
    .then(priorities =>{
      res.status(200).json(priorities);
    })
  })
  .catch(error =>{
    res.status(500).json({
      error: error
    })
  })
})

module.exports = {router: router};
