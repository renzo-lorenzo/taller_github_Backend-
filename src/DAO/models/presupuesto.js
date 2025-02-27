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
      });
      // inicio nuevo codigo
      Presupuesto.belongsTo(models.Usuario, { 
        foreignKey: "usuarioId",
        as: "Usuario"
      });
      // fin nuevo codigo
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
    // inicio nuevo codigo
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    // fin nuevo codigo
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