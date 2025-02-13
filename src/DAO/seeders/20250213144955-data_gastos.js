'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Gasto', [ // No olvidar quitar Projects y poner el nombre de la tabla "Gasto"
     {
      id: 1,
      fecha: new Date("2024-12-12"),
      categoria: "Ocio",
      descripcion: "La Niebla, libro de Steven King",
      recurrente: "No", 
      monto: 29.99
     },
     {
      id: 2,
      fecha: new Date("2/12/2024"),
      categoria: "Servicios",
      descripcion: "Servicio de Luz",
      recurrente: "Si", 
      monto: 229.99
     },
     {
      id: 3,
      fecha: new Date("2/12/2024"),
      categoria: "Servicios",
      descripcion: "Servicio de agua",
      recurrente: "Si", 
      monto: 129.99
     },
     {
      id: 4,
      fecha: new Date("5/12/2024"),
      categoria: "Servicios",
      descripcion: "Movistar",
      recurrente: "Si", 
      monto: 169.99
     },
     {
      id: 5,
      fecha: new Date("5/12/2024"),
      categoria: "Alimentacion",
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
