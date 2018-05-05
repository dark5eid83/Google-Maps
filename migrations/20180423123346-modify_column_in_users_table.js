'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.changeColumn('users', 'profile_picture', {
      type: Sequelize.STRING
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('users', 'profile_picture')
  }
};
