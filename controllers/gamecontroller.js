var router = require('express').Router();
var Game = require('../models/game');
const gameService = require('../services/gameService');

router.get('/all', async (req, res) => {
  const result = await gameService.getAll(req.user.id);
  if (result[0]) {
    res.status(200).json({
      games: result,
      message: 'Data fetched.',
    });
  }

  res.status(500).json({
    message: 'Data not found',
  });
});

router.get('/:id', async (req, res) => {
  const result = await gameService.getOne(req.params, req.user);
  if (result) {
    res.status(200).json({
      game: result,
    });
  } else {
    res.status(500).json({
      message: 'Data not found.',
    });
  }
});

router.post('/create', async (req, res) => {
  try {
    const game = await gameService.createOne(req.body, req.user);
    if (game) {
      res.status(200).json({
        game: game,
        message: 'Game created.',
      });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const result = await gameService.updateOne(
      req.params.id,
      req.user.id,
      req.body.game,
    );

    if (result[0]) {
      res.status(200).json({
        message: 'Successfully updated.',
      });
    } else {
      res.status(500).json({
        message: err.message,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.delete('/remove/:id', async (req, res) => {
  try {
    const result = await gameService.deleteOne(req.params, req.user);
    if (result) {
      res.status(200).json({
        message: 'Successfully deleted',
      });
    } else {
      res.status(500).json({
        error: 'not found',
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;
