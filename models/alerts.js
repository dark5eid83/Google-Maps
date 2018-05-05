'use strict';
module.exports = (sequelize, DataTypes) => {
  var alerts = sequelize.define('alerts', {
    user_id: DataTypes.INTEGER,
    message: DataTypes.STRING
  }, {});
  alerts.associate = function(models) {
    alerts.belongsTo(models.users, {
      foreignKey: 'user_id'
    });
  };
  return alerts;
};