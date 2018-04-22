'use strict';
module.exports = (sequelize, DataTypes) => {
  var searches = sequelize.define('searches', {
    name: DataTypes.STRING
  }, {});
  searches.associate = function(models) {
    // associations can be defined here
  };
  return searches;
};