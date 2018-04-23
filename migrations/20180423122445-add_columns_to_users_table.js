'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('users', 'profile_picture', Sequelize.INTEGER);
    queryInterface.addColumn('users', 'bio', Sequelize.STRING);
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('users', 'profile_picture');
    queryInterface.removeColumn('users', 'profile_picture');
  }
};
