'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class HistorialAdministrador extends Model {
    static associate(models) {
      HistorialAdministrador.belongsTo(models.UsuarioAdministrador, { foreignKey: 'usuarioId' });
    }
  }

  HistorialAdministrador.init(
    {
      accion: DataTypes.STRING,
      fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      usuarioId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'HistorialAdministrador',
      freezeTableName: true,
      timestamps: false,
    }
  );

  return HistorialAdministrador;
};
