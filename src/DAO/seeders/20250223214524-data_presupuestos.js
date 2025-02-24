'use strict';

const categoria = require('../models/categoria');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Presupuesto', [
      {
        categoriaId: 1,
        monto: 130
      },
      {
        categoriaId: 1,
        monto: 100
      },
      {
        categoriaId: 2,
        monto: 1230
      },
      {
        categoriaId: 2,
        monto: 100
      },
      {
        categoriaId: 3,
        monto: 780
      },
      {
        categoriaId: 3,
        monto: 100
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Presupuesto', null, {});
  }
};
