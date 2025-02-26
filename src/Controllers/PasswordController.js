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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
const db = require("../DAO/models");
const Usuario = db.Usuario;
// ENDPOINT PARA CAMBIAR CONTRASEÑA
router.put("/cambiar-password", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usuario, nuevaPassword, confirmarPassword } = req.body;
        if (!usuario || !nuevaPassword || !confirmarPassword) {
            res.status(400).json({ msg: "Todos los campos son obligatorios" });
            return;
        }
        if (nuevaPassword !== confirmarPassword) {
            res.status(400).json({ msg: "Las contraseñas no coinciden" });
            return;
        }
        const usuarioEncontrado = yield Usuario.findOne({ where: { username: usuario } });
        if (!usuarioEncontrado) {
            res.status(404).json({ msg: "Usuario no encontrado" });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(nuevaPassword, 10);
        yield usuarioEncontrado.update({ password: hashedPassword });
        res.json({ msg: "Contraseña actualizada correctamente" });
    }
    catch (error) {
        console.error("Error al cambiar la contraseña:", error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
}));
// Exportar el controlador en la forma que usas en tu backend
const PasswordController = () => {
    return router;
};
exports.default = PasswordController;
