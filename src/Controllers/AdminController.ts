import { Router } from "express";
const db = require("../DAO/models");

const AdminController = () => {
  const router = Router();
  const path = "/admin";

  // Obtener todos los usuarios administradores
  router.get("/users", async (req, res) => {
    try {
      const users = await db.Usuario.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los usuarios" });
    }
  });

  // Crear un nuevo usuario administrador
  router.post("/users", async (req, res) => {
    try {
      const { nombre, email, password } = req.body;
      const adminUser = await db.Usuario.create({ nombre, email, password });
      res.status(201).json(adminUser);
    } catch (error) {
      res.status(500).json({ message: "Error al crear el usuario administrador" });
    }
  });

  // Obtener un usuario administrador por ID
  router.get("/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const user = await db.Usuario.findByPk(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "Usuario no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el usuario" });
    }
  });

  // Actualizar un usuario administrador
  router.put("/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, email, password } = req.body;
      const user = await db.Usuario.findByPk(id);
      if (user) {
        user.nombre = nombre;
        user.email = email;
        user.password = password;
        await user.save();
        res.json(user);
      } else {
        res.status(404).json({ message: "Usuario no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el usuario" });
    }
  });

  // Eliminar un usuario administrador
  router.delete("/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const user = await db.Usuario.findByPk(id);
      if (user) {
        await user.destroy();
        res.json({ message: "Usuario eliminado correctamente" });
      } else {
        res.status(404).json({ message: "Usuario no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar el usuario" });
    }
  });

  // Obtener el historial de acciones
  router.get("/history", async (req, res) => {
    try {
      const history = await db.Historial.findAll();
      res.json(history);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el historial" });
    }
  });

  // Registrar una acción en el historial
  router.post("/history", async (req, res) => {
    try {
      const { usuarioId, accion } = req.body;
      const log = await db.Historial.create({ usuarioId, accion });
      res.status(201).json(log);
    } catch (error) {
      res.status(500).json({ message: "Error al registrar la acción" });
    }
  });

  return [path, router];
};

export default AdminController;
