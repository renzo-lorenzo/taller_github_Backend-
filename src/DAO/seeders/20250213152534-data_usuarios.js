'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Usuario', [ // No olvidar quitar Projects y poner el nombre de la tabla "Usuario"
      {
       nombre: "Renzo Henry",
       username: "Renzo",
       password: "123",
       estado: true
      }
     ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
