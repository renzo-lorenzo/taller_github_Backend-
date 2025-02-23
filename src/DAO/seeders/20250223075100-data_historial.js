'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Historial', [
      {
        usuarioId: 4,
        fecha: "2025-02-23", // ✅ Formato correcto para DATEONLY (YYYY-MM-DD)
        hora: "23:30", // ✅ Sequelize lo interpreta como TIME (HH:MM)
        accion: "Editar"
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Historial', null, {});
  }
};
