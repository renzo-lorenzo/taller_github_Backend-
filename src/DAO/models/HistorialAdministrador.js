const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HistorialAdministrador = sequelize.define('HistorialAdministrador', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    accion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'historial_administradores',
});

module.exports = HistorialAdministrador;
