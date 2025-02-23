import { Router, Request, Response } from "express";
const db = require("../DAO/models");

const DashboardController = () => {
  const router = Router();
  const path = "/dashboard";

  // Endpoint para estadísticas de usuarios
  router.get("/users-stats", async (req: Request, res: Response) => {
    try {
      // Contar usuarios con rol 'User'
      const totalUsers = await db.Usuario.count({
        where: { rol: 'User' }
      });

      // Obtener registros mensuales
      const monthlySignups = await db.Usuario.findAll({
        attributes: [
          [db.sequelize.fn('DATE_TRUNC', 'month', db.sequelize.col('createdAt')), 'month'],
          [db.sequelize.fn('COUNT', 'id'), 'count']
        ],
        where: { rol: 'User' },
        group: ['month'],
        order: [['month', 'ASC']],
        raw: true // Para obtener datos simples
      });

      // Formatear respuesta
      res.json({
        totalUsers,
        monthlySignups: monthlySignups.map(item => ({
          month: item.month.toISOString().split('T')[0], // Formato YYYY-MM-DD
          count: item.count
        }))
      });

    } catch (error) {
      res.status(500).json({
        message: "Error al obtener estadísticas",
        error: error.message
      });
    }
  });

  return [path, router];
};

export default DashboardController;
