import express, { Request, Response } from "express";
import bcrypt from "bcrypt";

const router = express.Router();
const db = require("../DAO/models"); 
const Usuario = db.Usuario; 

// 🟢 ENDPOINT PARA CAMBIAR CONTRASEÑA
router.put("/cambiar-password", async (req: Request, res: Response): Promise<void> => {
    try {
        const { usuario, nuevaPassword, confirmarPassword } = req.body;

        // 1️⃣ Verificar que se envían todos los campos
        if (!usuario || !nuevaPassword || !confirmarPassword) {
            res.status(400).json({ msg: "Todos los campos son obligatorios" });
            return;
        }

        // 2️⃣ Verificar que las contraseñas coincidan
        if (nuevaPassword !== confirmarPassword) {
            res.status(400).json({ msg: "Las contraseñas no coinciden" });
            return;
        }

        // 3️⃣ Buscar al usuario en la base de datos con Sequelize
        const usuarioEncontrado = await Usuario.findOne({ where: { username: usuario } });

        if (!usuarioEncontrado) {
            res.status(404).json({ msg: "Usuario no encontrado" });
            return;
        }

        // 4️⃣ Hashear la nueva contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(nuevaPassword, 10);

        // 5️⃣ Actualizar la contraseña en la base de datos
        await usuarioEncontrado.update({ password: hashedPassword });

        res.json({ msg: "Contraseña actualizada correctamente" });

    } catch (error) {
        console.error("Error al cambiar la contraseña:", error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
});

// Exportar el controlador en la forma que usas en tu backend
const PasswordController = () => {
    return router;
};

export default PasswordController;
