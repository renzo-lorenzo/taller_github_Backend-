'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Usuario', 'rol', {
      type: Sequelize.STRING,
      allowNull: true, // Puedes cambiar esto según tu necesidad
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Usuario', 'rol');
  }
};
