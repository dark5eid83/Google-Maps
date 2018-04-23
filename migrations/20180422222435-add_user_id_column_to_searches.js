'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('searches', 'user_id', Sequelize.INTEGER)
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('searches', 'user_id');
  }
};
