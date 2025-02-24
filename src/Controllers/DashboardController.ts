import { Router, Request, Response } from "express";
const db = require("../DAO/models");

const DashboardController = () => {
  const router = Router();
  const path = "/dashboard";

  // Endpoint para estadísticas de usuarios
  router.get("/users-stats", async (req: Request, res: Response): Promise<void> => {
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
        monthlySignups: monthlySignups.map((item: { month: string, count: number }) => ({
          month: item.month,
          count: item.count
      }))
      
      });

    } catch (error) {
          if (error instanceof Error) {
              console.error("Error:", error.message);
              res.status(500).json({ error: error.message });
              return
          } else {
              console.error("Error desconocido:", error);
              res.status(500).json({ error: "Ocurrió un error inesperado" });
              return
          }
      }
  });

  return [path, router];
};

export default DashboardController;
