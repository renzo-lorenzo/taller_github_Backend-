const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DashboardAdministrador = sequelize.define('DashboardAdministrador', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    metricName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    metricValue: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'dashboard_administradores',
});

module.exports = DashboardAdministrador;
