'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UsuarioAdministrador extends Model {
    static associate(models) {
      UsuarioAdministrador.hasMany(models.HistorialAdministrador, { foreignKey: 'usuarioId' });
    }
  }

  UsuarioAdministrador.init(
    {
      nombre: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      rol: {
        type: DataTypes.STRING,
        defaultValue: 'admin',
      },
    },
    {
      sequelize,
      modelName: 'UsuarioAdministrador',
      freezeTableName: true,
      timestamps: false,
    }
  );

  return UsuarioAdministrador;
};
