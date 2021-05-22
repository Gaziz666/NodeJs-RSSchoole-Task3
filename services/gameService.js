const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const GameModel = require('../models/game');
const Game = GameModel(sequelize, DataTypes);

module.exports = {
  getAll: async (userId) => {
    return await Game.findAll({ where: { owner_id: userId } });
  },

  getOne: async (params, user) => {
    console.log(params.id, user.id);
    return Game.findOne({ where: { id: params.id, owner_id: user.id } });
  },

  createOne: async (body, user) => {
    const { id: UserId } = user;
    console.log(UserId);
    const { title, studio, esrb_rating, user_rating, have_played } = body.game;
    return await Game.create({
      title,
      owner_id: UserId,
      studio,
      esrb_rating,
      user_rating,
      have_played,
    });
  },

  updateOne: async (gameId, userId, game) => {
    const { title, studio, esrb_rating, user_rating, have_played } = game;
    console.log('params', gameId, userId);
    return await Game.update(
      {
        title,
        studio,
        esrb_rating,
        user_rating,
        have_played,
      },
      {
        where: {
          id: gameId,
          owner_id: userId,
        },
      },
    );
  },

  deleteOne: async (params, user) => {
    return await Game.destroy({
      where: {
        id: params.id,
        owner_id: user.id,
      },
    });
  },
};
