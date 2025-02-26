'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Gasto", "usuarioId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Usuario",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Gasto", "usuarioId");
  }
};
