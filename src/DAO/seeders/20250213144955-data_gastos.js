'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    queryInterface.bulkInsert("Categoria", [
      { nombre: "Ocio"},
      { nombre: "Servicios"},
      { nombre: "Alimentacion"}
    ])

    return queryInterface.bulkInsert('Gasto', [ // No olvidar quitar Projects y poner el nombre de la tabla "Gasto"
      {
        fecha: new Date("2024-03-15"),
        categoriaId: 1,
        descripcion: "Cena en restaurante italiano",
        recurrente: "No", 
        monto: 85.50
       },
       {
        fecha: new Date("2024-04-01"),
        categoriaId: 2,
        descripcion: "Membresía del gimnasio",
        recurrente: "Sí", 
        monto: 150.00
       },
       {
        fecha: new Date("2024-05-20"),
        categoriaId: 3,
        descripcion: "Compra de gasolina",
        recurrente: "Sí", 
        monto: 300.75
       },
       {
        fecha: new Date("2024-06-10"),
        categoriaId: 1,
        descripcion: "Suscripción a Netflix",
        recurrente: "Sí", 
        monto: 55.99
       },
       {
        fecha: new Date("2024-07-05"),
        categoriaId: 2,
        descripcion: "Compra de ropa en rebajas",
        recurrente: "No", 
        monto: 420.30
       },
       {
        fecha: new Date("2024-08-22"),
        categoriaId: 3,
        descripcion: "Pago de internet",
        recurrente: "Sí", 
        monto: 120.00
       }
    ], {});
   },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Usuario", null, {});  // No olvidar quitar Projects y poner el nombre de la tabla "Usuario"
  }
};
