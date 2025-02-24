'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    static associate(models) {
      Categoria.hasMany(models.Gasto, {
        foreignKey : "categoriaId"
      })

      Categoria.hasMany(models.Presupuesto, {
        foreignKey : "categoriaId"
      })
    }
  }
  Categoria.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categoria',
    freezeTableName : true,
    timestamps : false
  });
  return Categoria;
};