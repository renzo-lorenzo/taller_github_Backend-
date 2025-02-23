'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DashboardAdministrador extends Model {
    static associate(models) {
      // Relaciones si es necesario
    }
  }

  DashboardAdministrador.init(
    {
      metricName: DataTypes.STRING,
      metricValue: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'DashboardAdministrador',
      freezeTableName: true,
      timestamps: false,
    }
  );

  return DashboardAdministrador;
};
