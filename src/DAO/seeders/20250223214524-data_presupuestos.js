'use strict';

const categoria = require('../models/categoria');
const usuario = require('../models/usuario');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Presupuesto', [
      // inicio nuevo codigo (Se agrego usuarioId)
      {
        categoriaId: 1,
        usuarioId:3,
        monto: 130
      },
      {
        categoriaId: 1,
        usuarioId:4,
        monto: 100
      },
      {
        categoriaId: 2,
        usuarioId:3,
        monto: 1230
      },
      {
        categoriaId: 2,
        usuarioId:4,
        monto: 100
      },
      {
        categoriaId: 3,
        usuarioId:4,
        monto: 780
      },
      {
        categoriaId: 3,
        usuarioId:2,
        monto: 100
      }
      // fin nuevo codigo
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Presupuesto', null, {});
  }
};
