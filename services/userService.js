const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const UserModel = require('../models/user');
const User = UserModel(sequelize, DataTypes);

module.exports = {
  signUp: async (args) => {
    const { full_name, username, password, email } = args;

    return await User.create({
      full_name,
      username,
      passwordHash: bcrypt.hashSync(password, 10),
      email,
    });
  },

  signIn: async (username) => {
    console.log(username);
    const result = await User.findOne({ where: { username: username } });
    console.log('res', result);
    return result;
  },
};
