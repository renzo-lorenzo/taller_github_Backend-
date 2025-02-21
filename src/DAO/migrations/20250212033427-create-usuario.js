'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Usuario', { // en singular
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
      //,
      //createdAt: {
        //allowNull: false,
        //type: Sequelize.DATE
      //},
      //updatedAt: {
        //allowNull: false,
        //type: Sequelize.DATE
      //} 
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Usuario'); // en singular
  }
};