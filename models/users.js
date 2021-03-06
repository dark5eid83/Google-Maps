'use strict';
let bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    bio: DataTypes.STRING,
    profile_picture: DataTypes.STRING
  }, {});
  users.associate = function(models) {
     users.hasMany(models.searches, {
       foreignKey: 'user_id'
     });

     users.hasMany(models.alerts, {
         foreignKey: 'user_id'
     });
  };

  users.validPassword = function(testPass, dbPass) {
      return bcrypt.compareSync(testPass, dbPass);
  };

  return users;
};