import express, { Request, Response } from "express";
import bcrypt from "bcrypt"; // Importamos bcrypt para comparar contraseñas
import { where } from "sequelize";
const db = require("../DAO/models");

const UsuarioController = () => {
    const path = "/usuarios";
    const router = express.Router();

    // Endpoint Login
    router.post("/login", async (req: Request, resp: Response) => {
        console.log(req.body);
        const usuario = req.body.usuario;
        const password = req.body.password;

        // Buscar usuario sin comparar contraseña en la consulta
        const usuarioEncontrado = await db.Usuario.findOne({
            where: {
                username: usuario,
                estado: true
            }
        });

        console.log("Usuario encontrado:", usuarioEncontrado);

        if (usuarioEncontrado) {
            // Comparar contraseña ingresada con la almacenada (encriptada)
            const passwordValida = await bcrypt.compare(password, usuarioEncontrado.password);

            if (passwordValida) {
                // Login correcto
                resp.json({
                    id: usuarioEncontrado.id,
                    nombre: usuarioEncontrado.nombre,
                    usuario: usuarioEncontrado.username,
                    msg: ""
                });
            } else {
                // Contraseña incorrecta
                resp.json({ msg: "Error en login" });
            }
        } else {
            // Usuario no encontrado
            resp.json({ msg: "Error en login" });
        }
    });

    router.get("/:id", async (req: Request, resp: Response) => {
        const userId = req.params.id;

        const usuario = await db.Usuario.findByPk(userId, {
            attributes: ["id", "nombre", "username", "password"]
        });

        if (usuario) {
            resp.json(usuario);
        } else {
            resp.status(404).json({ msg: "Usuario no encontrado" });
        }
    });

    // Endpoint de registro de usuarios
    router.post("/", async (req: Request, resp: Response) => {
        console.log(req.body);

        const usuario = req.body.usuario;
        const nombre = req.body.nombre;
        const password = req.body.password;

        if (!usuario || !nombre || !password) {
            resp.json({ msg: "Todos los campos son obligatorios" });
            return;
        }

        const usuarioCreado = await db.Usuario.create({
            nombre: nombre,
            username: usuario,
            password: password,
            estado: true,
        });

        resp.json({ msg: "" });
    });

    return [path, router];
};

export default UsuarioController;
