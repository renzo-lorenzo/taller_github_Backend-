'use strict';

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const saltRounds = 10;

    await queryInterface.bulkInsert('Usuario', [
      {
        nombre: "Renzo Henry",
        username: "20211532@aloe.ulima.edu.pe",
        password: await bcrypt.hash("1532", saltRounds),
        estado: true,
        rol: "User"
      },
      {
        nombre: "Piero Silva",
        username: "20194613@aloe.ulima.edu.pe",
        password: await bcrypt.hash("4613", saltRounds),
        estado: true,
        rol: "User"
      },
      {
        nombre: "Isaac Sisniegas",
        username: "20191931@aloe.ulima.edu.pe",
        password: await bcrypt.hash("1931", saltRounds),
        estado: true,
        rol: "User"
      },
      {
        nombre: "Diego Morales",
        username: "20211769@aloe.ulima.edu.pe",
        password: await bcrypt.hash("1769", saltRounds),
        estado: true,
        rol: "User"
      },
      {
        nombre: "Rodrigo Figueroa",
        username: "20202926@aloe.ulima.edu.pe",
        password: await bcrypt.hash("2926", saltRounds),
        estado: true,
        rol: "User"
      },
      {
        nombre: "Edgard Vargas",
        username: "ejvargas@ulima.edu.pe",
        password: await bcrypt.hash("1234", saltRounds),
        estado: true,
        rol: "Admin"
      },
      {
        nombre: "Hernan Quintana",
        username: "hquintan@ulima.edu.pe",
        password: await bcrypt.hash("1234", saltRounds),
        estado: true,
        rol: "Admin"
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Usuario', null, {});
  }
};
