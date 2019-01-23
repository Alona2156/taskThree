const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/user');
const checkAuth = require('../middleware/checkAuth.js');

var userId = "";

router.post('/signup-user', (req, res, next) => {
  userId = "";
  User.find({email: req.body.email})
    .exec()
    .then(user => {
      if (user.length >= 1) {
        res.status(422).json({message: 'This user exists already'})
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({error: err})
          } else {
            const user = new User({
              name: req.body.name,
              email: req.body.email,
              password: hash
            })
            user.save()
              .then(result => {
                userId = result._id;
                module.exports.userId = userId;
                res.clearCookie("token");
                res.status(201).json({message: "User created successfully"})
              })
              .catch(error => {
                console.log(error);
                res.status(500).json({error: error})
              })
          }
        })
      }
    })
})

router.post('/login-user', checkAuth, (req, res, next) => {
  userId = "";
  if (Object.keys(req.body.data).length === 0 && req.headers.userData === undefined){
    res.status(204).json({message: ""});
  }
  else if (req.headers.userData) {
    User.find({_id: req.headers.userData.id})
      .exec()
      .then(user => {
        if (user.length < 1) {
          res.status(401).json({message: 'User not found'})
        } else {
          userId = user[0]._id;
          module.exports.userId = userId;
          res.status(200).json({message: "Authentification succeded"})
        }
      })
        .catch(error => {
          res.status(500).json({error: error});
        })
   }
  else {
    User.find({email: req.body.data.email})
      .exec()
      .then(user => {
        if (user.length < 1) {
          res.status(401).json({message: "User not found"})
        }
        else {
          bcrypt.compare(req.body.data.password, user[0].password, function(err, result) {
            if (err) {
              res.status(401).json({message: "Authentification failed"})
            }
            else if (result) {
              userId = user[0]._id;
              module.exports.userId = userId;
              const token = jwt.sign({
                email: user[0].email,
                id: user[0]._id
              }, process.env.secret, {
                expiresIn: "7 days"
              });
              res.cookie('token', token, {
                httpOnly: true
              });
              res.status(200).json({
                message: "Authentification succeded"
              })
            }
            else {
              res.status(401).json({message: "Password is not a match"})
            }
          })
        }
      })
      .catch(error => {
        res.status(500).json({error: error})
      })
    }
})

router.get('/logout-user', (req, res, next) => {
  userId = "";
  module.exports.userId = userId;
  res.status(200).json({
    userId: userId
  });
})

module.exports.router = router;
