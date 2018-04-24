'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   queryInterface.changeColumn('alerts', 'user_id', {
       type: Sequelize.INTEGER
   })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('alerts', 'user_id');
  }
};
