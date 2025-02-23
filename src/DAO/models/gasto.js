'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gasto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Gasto.belongsTo(models.Categoria, {
        foreignKey : "categoriaId"
      })
    }
  }
  Gasto.init({
    fecha: DataTypes.DATE,
    categoriaId: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    recurrente: DataTypes.STRING,
    monto: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Gasto',
    freezeTableName : true, // Queremos que se llame igual en la bd
    timestamps : false // Para que no se agreguen los atributos de auditoria
  });
  return Gasto;
};