'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Usuario', [
      {
        nombre: "Renzo Henry",
        username: "20211532@aloe.ulima.edu.pe",
        password: "1532",
        estado: true
      },
      {
        nombre: "Piero Silva",
        username: "20194613@aloe.ulima.edu.pe",
        password: "4613",
        estado: true
      },
      {
        nombre: "Isaac Sisniegas",
        username: "20191931@aloe.ulima.edu.pe",
        password: "1931",
        estado: true
      },
      {
        nombre: "Diego Morales",
        username: "20211769@aloe.ulima.edu.pe",
        password: "1769",
        estado: true
      },
      {
        nombre: "Rodrigo Figueroa",
        username: "20202926@aloe.ulima.edu.pe",
        password: "2926",
        estado: true
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Usuario', null, {});
  }
};
