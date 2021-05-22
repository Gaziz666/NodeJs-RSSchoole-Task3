const express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var User = require('../models/user');
const userService = require('../services/userService');

router.post('/signup', async (req, res) => {
  try {
    const user = await userService.signUp(req.body.user);
    let token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', {
      expiresIn: 60 * 60 * 24,
    });

    res.status(200).json({
      user: user,
      token: token,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/signin', async (req, res) => {
  try {
    const user = await userService.signIn(req.body.user.username);

    if (user) {
      bcrypt.compare(
        req.body.user.password,
        user.passwordHash,
        function (err, matches) {
          if (matches) {
            const token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', {
              expiresIn: 60 * 60 * 24,
            });
            res.json({
              user: user,
              message: 'Successfully authenticated.',
              sessionToken: token,
            });
          } else {
            res.status(502).send({ error: 'Passwords do not match.' });
          }
        },
      );
    } else {
      res.status(403).send({ error: 'User not found.' });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
