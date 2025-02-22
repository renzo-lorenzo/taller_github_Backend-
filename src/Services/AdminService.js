const UsuarioAdministrador = require('../DAO/models/UsuarioAdministrador');
const HistorialAdministrador = require('../DAO/models/HistorialAdministrador');

module.exports = {
    // Obtener todos los usuarios administradores
    async getAllUsers() {
        return await UsuarioAdministrador.findAll();
    },

    // Crear un nuevo usuario administrador
    async createAdminUser(nombre, email, password) {
        return await UsuarioAdministrador.create({ nombre, email, password, rol: 'admin' });
    },

    // Obtener un usuario administrador por ID
    async getAdminUserById(id) {
        return await UsuarioAdministrador.findByPk(id);
    },

    // Actualizar un usuario administrador
    async updateAdminUser(id, nombre, email, password) {
        const user = await UsuarioAdministrador.findByPk(id);
        if (user) {
            user.nombre = nombre;
            user.email = email;
            user.password = password;
            await user.save();
        }
        return user;
    },

    // Eliminar un usuario administrador
    async deleteAdminUser(id) {
        const user = await UsuarioAdministrador.findByPk(id);
        if (user) {
            await user.destroy();
        }
        return user;
    },

    // Obtener todo el historial de acciones
    async getAdminHistory() {
        return await HistorialAdministrador.findAll();
    },

    // Registrar una acción en el historial
    async logAdminAction(usuarioId, accion) {
        return await HistorialAdministrador.create({ usuarioId, accion });
    },
};