'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Presupuesto extends Model {
    static associate(models) {
      Presupuesto.belongsTo(models.Categoria,{
        foreignKey: "categoriaId",
        as: "Categoria"
      })
    }
  }
  Presupuesto.init({
    categoriaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: "Categoria",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    },
    monto: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Presupuesto',
    freezeTableName: true,
    timestamps: false
  });
  return Presupuesto;
};