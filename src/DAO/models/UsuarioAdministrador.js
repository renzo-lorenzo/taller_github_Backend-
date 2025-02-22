const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UsuarioAdministrador = sequelize.define('UsuarioAdministrador', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rol: {
        type: DataTypes.STRING,
        defaultValue: 'admin',
    },
}, {
    tableName: 'usuarios_administradores',
});

module.exports = UsuarioAdministrador;
