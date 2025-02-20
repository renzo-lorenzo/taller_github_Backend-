'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Usuario.init({
    nombre: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    estado : DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Usuario',
    freezeTableName : true, // Evitar que se ponga en plural
    timestamps : false // Eliminar campos de auditoria
  });
  return Usuario;
};