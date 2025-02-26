"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db = require("../DAO/models");
const AdminController = () => {
    const router = (0, express_1.Router)();
    const path = "/admin";
    // Obtener todos los usuarios administradores
    router.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield db.Usuario.findAll();
            res.json(users);
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener los usuarios" });
        }
    }));
    // Crear un nuevo usuario administrador
    router.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { nombre, email, password } = req.body;
            const adminUser = yield db.Usuario.create({ nombre, email, password });
            res.status(201).json(adminUser);
        }
        catch (error) {
            res.status(500).json({ message: "Error al crear el usuario administrador" });
        }
    }));
    // Obtener un usuario administrador por ID
    router.get("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const user = yield db.Usuario.findByPk(id);
            if (user) {
                res.json(user);
            }
            else {
                res.status(404).json({ message: "Usuario no encontrado" });
            }
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener el usuario" });
        }
    }));
    // Actualizar un usuario administrador
    router.put("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { nombre, email, password } = req.body;
            const user = yield db.Usuario.findByPk(id);
            if (user) {
                user.nombre = nombre;
                user.email = email;
                user.password = password;
                yield user.save();
                res.json(user);
            }
            else {
                res.status(404).json({ message: "Usuario no encontrado" });
            }
        }
        catch (error) {
            res.status(500).json({ message: "Error al actualizar el usuario" });
        }
    }));
    // Eliminar un usuario administrador
    router.delete("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const user = yield db.Usuario.findByPk(id);
            if (user) {
                yield user.destroy();
                res.json({ message: "Usuario eliminado correctamente" });
            }
            else {
                res.status(404).json({ message: "Usuario no encontrado" });
            }
        }
        catch (error) {
            res.status(500).json({ message: "Error al eliminar el usuario" });
        }
    }));
    // Obtener el historial de acciones
    router.get("/history", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const history = yield db.Historial.findAll();
            res.json(history);
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener el historial" });
        }
    }));
    // Registrar una acción en el historial
    router.post("/history", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { usuarioId, accion } = req.body;
            const log = yield db.Historial.create({ usuarioId, accion });
            res.status(201).json(log);
        }
        catch (error) {
            res.status(500).json({ message: "Error al registrar la acción" });
        }
    }));
    return [path, router];
};
exports.default = AdminController;
