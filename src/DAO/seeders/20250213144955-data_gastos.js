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
      id: 1,
      fecha: new Date("2024-12-12"),
      categoriaId: 1,
      descripcion: "La Niebla, libro de Steven King",
      recurrente: "No", 
      monto: 29.99
     },
     {
      id: 2,
      fecha: new Date("2/12/2024"),
      categoriaId: 2,
      descripcion: "Servicio de Luz",
      recurrente: "Si", 
      monto: 229.99
     },
     {
      id: 3,
      fecha: new Date("2/12/2024"),
      categoriaId: 2,
      descripcion: "Servicio de agua",
      recurrente: "Si", 
      monto: 129.99
     },
     {
      id: 4,
      fecha: new Date("5/12/2024"),
      categoriaId: 2,
      descripcion: "Movistar",
      recurrente: "Si", 
      monto: 169.99
     },
     {
      id: 5,
      fecha: new Date("5/12/2024"),
      categoriaId: 3,
      descripcion: "Compras del mes",
      recurrente: "Si", 
      monto: 369.99
     }
    ], {});
   },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Usuario", null, {});  // No olvidar quitar Projects y poner el nombre de la tabla "Usuario"
  }
};
