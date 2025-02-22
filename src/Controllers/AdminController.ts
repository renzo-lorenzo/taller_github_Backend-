import { Request, Response } from 'express';
const db = require('../DAO/models');

export default class AdminController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await db.UsuarioAdministrador.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
  }

  static async createAdminUser(req: Request, res: Response) {
    try {
      const { nombre, email, password } = req.body;
      const adminUser = await db.UsuarioAdministrador.create({ nombre, email, password });
      res.status(201).json(adminUser);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el usuario administrador' });
    }
  }

  static async getAdminUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await db.UsuarioAdministrador.findByPk(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el usuario' });
    }
  }

  static async updateAdminUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nombre, email, password } = req.body;
      const user = await db.UsuarioAdministrador.findByPk(id);
      if (user) {
        user.nombre = nombre;
        user.email = email;
        user.password = password;
        await user.save();
        res.json(user);
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
  }

  static async deleteAdminUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await db.UsuarioAdministrador.findByPk(id);
      if (user) {
        await user.destroy();
        res.json({ message: 'Usuario eliminado correctamente' });
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
  }

  static async getAdminHistory(req: Request, res: Response) {
    try {
      const history = await db.HistorialAdministrador.findAll();
      res.json(history);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el historial' });
    }
  }

  static async logAdminAction(req: Request, res: Response) {
    try {
      const { usuarioId, accion } = req.body;
      const log = await db.HistorialAdministrador.create({ usuarioId, accion });
      res.status(201).json(log);
    } catch (error) {
      res.status(500).json({ message: 'Error al registrar la acción' });
    }
  }
}
