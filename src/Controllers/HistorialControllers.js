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
const db = require("../DAO/models");
const HistorialController = () => {
    const path = "/historial";
    const router = express_1.default.Router();
    /*
    Endpoint de obtencion historial
    Path : "/historial/"
    Metodo : GET
    Output:
    {
        msg : "",
        historial : []
    }
    */
    router.get("/", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const historial = yield db.Historial.findAll({
            include: [
                {
                    model: db.Usuario,
                    attributes: ["nombre", "username"]
                }
            ]
        }); //conectamos con la base de datos
        resp.json({
            msg: "",
            historial: historial
        });
    }));
    /*
    Endpoint de registro de acciones al historial
    Path : "/historial/"
    Metodo : POST
    Input :
    - Params (URL):
        usuarioId : number
        accion : string
    Output:
    {
        msg : ""
    }
    */
    router.post("/", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { usuarioId, accion } = req.body;
            // Validar que los campos requeridos estén presentes
            if (!usuarioId || !accion) {
                resp.status(400).json({ msg: "usuarioId y accion son obligatorios" });
                return;
            }
            // Verificar si el usuario existe en la BD antes de registrar la acción
            const usuarioExiste = yield db.Usuario.findByPk(usuarioId);
            if (!usuarioExiste) {
                resp.status(404).json({ msg: "Usuario no encontrado" });
                return;
            }
            // Obtener la fecha y hora actual en formato adecuado
            const fechaActual = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
            const horaActual = new Date().toLocaleTimeString("es-ES", {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit"
            });
            // Insertar el nuevo registro en la tabla `Historial`
            yield db.Historial.create({
                usuarioId,
                fecha: fechaActual,
                hora: horaActual,
                accion
            });
            resp.status(201).json({ msg: "" });
            return;
        }
        catch (error) {
            console.error("Error al registrar en el historial:", error);
            resp.status(500).json({ msg: "Error interno del servidor" });
            return;
        }
    }));
    return [path, router];
};
exports.default = HistorialController;
