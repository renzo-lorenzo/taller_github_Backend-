'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Categoria', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
    });
    await queryInterface.addConstraint("Gasto", {
      name : "FK_GASTO_CATEGORIA",
      type : "FOREING KEY",
      fields : ["categoriaId"],
      references : {
        table : "Categoria",
        field : "id"
      }
    })

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Categoria');
  }
};