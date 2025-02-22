import { Request, Response } from 'express';
const db = require('../DAO/models');

export default class DashboardController {
  static async getDashboardData(req: Request, res: Response) {
    try {
      const totalUsers = await db.UsuarioAdministrador.count();
      const totalActions = await db.HistorialAdministrador.count();
      const lastAction = await db.HistorialAdministrador.findOne({
        order: [['fecha', 'DESC']],
      });

      res.json({
        totalUsers,
        totalActions,
        lastAction: lastAction ? lastAction.accion : 'No hay acciones registradas',
      });
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los datos del dashboard' });
    }
  }
}
