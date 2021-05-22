const jwt = require('jsonwebtoken');
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const UserModel = require('../models/user');
const User = UserModel(sequelize, DataTypes);

module.exports = function (req, res, next) {
  if (req.method == 'OPTIONS') {
    next(); // allowing options as a method for request
  } else {
    const sessionToken = req.headers.authorization;
    if (!sessionToken)
      return res
        .status(403)
        .send({ auth: false, message: 'No token provided.' });
    else {
      jwt.verify(
        sessionToken.slice(7),
        'lets_play_sum_games_man',
        (err, decoded) => {
          if (decoded) {
            User.findOne({ where: { id: decoded.id } }).then(
              (user) => {
                req.user = user;
                console.log(`user: ${user}`);
                next();
              },
              function () {
                res.status(401).send({ error: 'not authorized' });
              },
            );
          } else {
            console.log(err);
            res.status(400).send({ error: 'not authorized' });
          }
        },
      );
    }
  }
};
