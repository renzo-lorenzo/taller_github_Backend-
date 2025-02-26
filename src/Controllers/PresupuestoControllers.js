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
const PresupuestoController = () => {
    const path = "/presupuesto";
    const router = express_1.default.Router();
    /*
    Endpoint de listado de presupuestos
    Path : "/presupuesto/"
    Metodo : GET
    Output:
    {
        msg : "",
        presupuestos : []
    }
    */
    router.get("/", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const presupuestos = yield db.Presupuesto.findAll({
            include: [
                {
                    model: db.Categoria,
                    as: "Categoria",
                    attributes: ["nombre"]
                }
            ]
        }); //conectamos con la base de datos
        resp.json({
            msg: "",
            presupuestos: presupuestos
        });
    }));
    /*
    Endpoint de registro de presupuesto
    Path : "/presupuesto/"
    Metodo : POST
    Input :
    - Body (JSON):
    {
        categoriaId : numero,
        monto : numero
    }
    Output:
    {
        msg : ""
    }
    */
    router.post("/", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.body);
        const { categoriaId, monto } = req.body;
        if (!categoriaId || !monto) {
            resp.json({ msg: "Todos los campos son obligatorios" });
            return;
        }
        const pptoCreado = yield db.Presupuesto.create({
            categoriaId,
            monto
        });
        resp.json({ msg: "" });
        return;
    }));
    /*
    Endpoint de Edición de Presupuesto
    Path : "/presupuesto/:id"
    Metodo : PUT
    Input :
    - Params (URL):
        id : número (ID del presupuesto a editar)
    - Body (JSON):
    {
        categoriaId : numero,
        monto : numero
    }
    Output:
    {
        msg : ""
    }
    */
    router.put("/:id", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                resp.status(400).json({ msg: "ID inválido" });
                return;
            }
            const { categoriaId, monto } = req.body;
            const ppto = yield db.Presupuesto.findByPk(id);
            if (!ppto) {
                resp.json({ msg: "Presupuesto no encontrado" });
                return;
            }
            yield ppto.update({
                categoriaId,
                monto
            });
            resp.json({
                msg: ""
            });
            return;
        }
        catch (error) {
            console.error("Error al actualizar presupuesto:", error);
            resp.json({ msg: "Error interno del servidor" });
            return;
        }
    }));
    /*
    Endpoint de Eliminación de Presupuesto
    Path : "/presupuesto/:id"
    Metodo : DELETE
    Input :
    - Params (URL):
        id : número (ID del presupuesto a eliminar)
    Output:
    {
        msg : ""
    }
    */
    router.delete("/:id", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                resp.status(400).json({ msg: "ID inválido" });
                return;
            }
            const ppto = yield db.Presupuesto.findByPk(id);
            if (!ppto) {
                resp.json({ msg: "Presupuesto no encontrado" });
                return;
            }
            yield ppto.destroy();
            resp.json({ msg: "" });
            return;
        }
        catch (error) {
            console.error("Error al eliminar presupuesto:", error);
            resp.status(500).json({ msg: "Error interno del servidor" });
            return;
        }
    }));
    return [path, router];
};
exports.default = PresupuestoController;
