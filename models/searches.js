'use strict';
module.exports = (sequelize, DataTypes) => {
  var searches = sequelize.define('searches', {
    name: DataTypes.STRING
  }, {});
  searches.associate = function(models) {
    searches.belongsTo(models.users, {
      foreignKey: 'user_id'
    })
  };
  return searches;
};