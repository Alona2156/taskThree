const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Task = require('../models/task');
const Priority = require('../models/priority');

var UserModel = require('./users');

router.get('/get-tasks', (req, res, next) => {
  Task.find({userId: UserModel.userId})
    .populate('priority')
    .exec()
    .then(tasks => {
      res.status(200).json(tasks);
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
});

router.post('/post-new-task', (req, res, next) => {
  var task = new Task(req.body);
  task.userId = UserModel.userId;
  if (task.userId !== undefined){
  task.save()
    .then(function() {
      Task.find({userId: task.userId})
        .populate('priority')
        .exec()
        .then(tasks => {
          res.status(200).json(tasks)
        })
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
  }
  else {
    res.status(200).json([]);
  }
});

router.patch('/update-task', (req, res, next) => {
  const id = req.body._id;
  const newFields = {};
Object.keys(req.body).forEach(function(key){
  if (key !== "_id"){
  newFields[key] = req.body[key];
  }
})
  Task.update({
      _id: id
    }, {
      $set: newFields
    })
    .exec()
    .then(function() {
      Task.find({userId: UserModel.userId})
        .populate('priority')
        .exec()
        .then(tasks => {
          res.status(200).json(tasks)
        })
    })
    .catch(error => {
      res.status(500).json({
        error: error
      })
    });
});

router.delete('/delete-task', (req, res, next) => {
  const id = req.query._id;
  Task.remove({_id: id})
  .exec()
  .then(tasks => {
    res.status(200).json(tasks)
  })
  .catch(error => {
    res.status(500).json({
      error: error
    })
  })
})

module.exports = {router: router};
