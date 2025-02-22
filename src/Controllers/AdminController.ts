import { Request, Response } from 'express';
import AdminService from '../Services/AdminService';

export default class AdminController {
    // Obtener todos los usuarios administradores
    static async getAllUsers(req: Request, res: Response) {
        try {
            const users = await AdminService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los usuarios' });
        }
    }

    // Crear un nuevo usuario administrador
    static async createAdminUser(req: Request, res: Response) {
        try {
            const { nombre, email, password } = req.body;
            const adminUser = await AdminService.createAdminUser(nombre, email, password);
            res.status(201).json(adminUser);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el usuario administrador' });
        }
    }

    // Obtener un usuario administrador por ID
    static async getAdminUserById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await AdminService.getAdminUserById(Number(id));
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el usuario' });
        }
    }

    // Actualizar un usuario administrador
    static async updateAdminUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nombre, email, password } = req.body;
            const user = await AdminService.updateAdminUser(Number(id), nombre, email, password);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el usuario' });
        }
    }

    // Eliminar un usuario administrador
    static async deleteAdminUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await AdminService.deleteAdminUser(Number(id));
            if (user) {
                res.json({ message: 'Usuario eliminado correctamente' });
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el usuario' });
        }
    }

    // Obtener el historial de acciones
    static async getAdminHistory(req: Request, res: Response) {
        try {
            const history = await AdminService.getAdminHistory();
            res.json(history);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el historial' });
        }
    }
}
