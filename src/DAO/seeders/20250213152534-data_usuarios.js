'use strict';

const bcrypt = require("bcrypt"); // Cambiamos import por require

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const saltRounds = 10; // Nivel de encriptación

    await queryInterface.bulkInsert('Usuario', [
      {
        nombre: "Renzo Henry",
        username: "20211532@aloe.ulima.edu.pe",
        password: await bcrypt.hash("1532", saltRounds), // Encriptamos la contraseña
        estado: true
      },
      {
        nombre: "Piero Silva",
        username: "20194613@aloe.ulima.edu.pe",
        password: await bcrypt.hash("4613", saltRounds),
        estado: true
      },
      {
        nombre: "Isaac Sisniegas",
        username: "20191931@aloe.ulima.edu.pe",
        password: await bcrypt.hash("1931", saltRounds),
        estado: true
      },
      {
        nombre: "Diego Morales",
        username: "20211769@aloe.ulima.edu.pe",
        password: await bcrypt.hash("1769", saltRounds),
        estado: true
      },
      {
        nombre: "Rodrigo Figueroa",
        username: "20202926@aloe.ulima.edu.pe",
        password: await bcrypt.hash("2926", saltRounds),
        estado: true
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Usuario', null, {});
  }
};
