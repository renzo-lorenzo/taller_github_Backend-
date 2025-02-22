const UsuarioAdministrador = require('../DAO/models/UsuarioAdministrador');
const HistorialAdministrador = require('../DAO/models/HistorialAdministrador');

module.exports = {
    async getDashboardData() {
        try {
            // Obtener el número total de usuarios administradores
            const totalUsers = await UsuarioAdministrador.count();

            // Obtener el número total de acciones en el historial
            const totalActions = await HistorialAdministrador.count();

            // Obtener la última acción registrada
            const lastAction = await HistorialAdministrador.findOne({
                order: [['fecha', 'DESC']],
            });

            // Obtener el número de acciones por tipo
            const actionsByType = await HistorialAdministrador.findAll({
                attributes: ['accion', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
                group: ['accion'],
            });

            return {
                totalUsers,
                totalActions,
                lastAction: lastAction ? lastAction.accion : 'No hay acciones registradas',
                actionsByType,
            };
        } catch (error) {
            throw new Error('Error al obtener los datos del dashboard');
        }
    },
};
