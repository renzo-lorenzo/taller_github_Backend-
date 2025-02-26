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
const { Op } = require("sequelize");
const GastoController = () => {
    const path = "/gastos";
    const router = express_1.default.Router();
    router.get("/", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const { orden } = req.query;
        const orderBy = orden === "monto" ? [["monto", "ASC"]] : [["fecha", "ASC"]];
        const gastos = yield db.Gasto.findAll({ order: orderBy });
        resp.json({ msg: "", gastos });
    }));
    // Operacion para listar gastos
    router.get("/", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const gastos = yield db.Gasto.findAll(); //conectamos con la base de datos
        resp.json({
            msg: "",
            gastos: gastos
        });
    }));
    /*
    Endpoint de registro de Proyecto
    Path : "/gastos"
    Metodo : POST
    Input :
    {
        nombre : "",
        categoria : 1
    }
    Output:
    {
        msg : ""
    }
    */
    router.post("/", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const nuevoGasto = req.body;
        console.log(nuevoGasto);
        const gastoCreado = yield db.Gasto.create({
            fecha: nuevoGasto.fecha,
            categoriaId: nuevoGasto.categoriaId,
            descripcion: nuevoGasto.descripcion,
            recurrente: nuevoGasto.recurrente === "Sí" ? "Sí" : "No",
            monto: nuevoGasto.monto,
        });
        resp.json({ msg: "", gasto: gastoCreado });
    }));
    router.get("/", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { filtro, valor } = req.query;
            console.log("Parámetros recibidos en el backend:", { filtro, valor });
            if (!filtro || !valor) {
                console.log("Falta el filtro o el valor, devolviendo todos los gastos");
                const gastos = yield db.Gasto.findAll();
                resp.json({ msg: "", gastos });
            }
            let whereClause = {};
            if (filtro === "categoria") {
                whereClause.categoriaId = { [Op.eq]: parseInt(valor, 10) }; // 🔹 Comparación exacta
            }
            else if (filtro === "monto") {
                whereClause.monto = { [Op.eq]: parseFloat(valor) }; // 🔹 Comparación exacta
            }
            else if (filtro === "fecha") {
                whereClause.fecha = { [Op.eq]: new Date(valor) }; // 🔹 Conversión a Date
            }
            console.log("WhereClause construido:", JSON.stringify(whereClause, null, 2));
            const gastos = yield db.Gasto.findAll({ where: whereClause });
            console.log("🔍 Gastos filtrados encontrados:", gastos.length);
            resp.json({ msg: "", gastos });
        }
        catch (error) {
            console.error("Error al filtrar gastos:", error);
            resp.status(500).json({ msg: "Error al filtrar gastos" });
        }
    }));
    router.post("/eliminar", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.body;
            if (!id || isNaN(id)) {
                resp.status(400).json({ msg: "ID inválido o no proporcionado" });
                return;
            }
            const gasto = yield db.Gasto.findOne({ where: { id } });
            if (!gasto) {
                resp.status(404).json({ msg: "Gasto no encontrado" });
                return;
            }
            yield gasto.destroy();
            resp.json({ msg: "Gasto eliminado correctamente" });
        }
        catch (error) {
            console.error("Error al eliminar gasto:", error);
            resp.status(500).json({ msg: "Error del servidor" });
        }
    }));
    return [path, router];
};
exports.default = GastoController;
