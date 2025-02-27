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
const CategoriaController = () => {
    const path = "/categorias";
    const router = express_1.default.Router();
    /*
    Endpoint de listado de categorias con presupuesto total
    Path : "/categorias/"
    Metodo : GET
    Output:
    {
        msg : "",
        categorias : [
            {
                id: 1
                nombre : "Nombre de Categoria",
                PresupuestoTotal : Suma de presupuestos con misma categoria
            }
        ]
    }
    */
    router.get("/usuario/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const usuarioId = Number(req.params.id); // Obtener el ID del usuario de la URL
            if (isNaN(usuarioId)) {
                res.status(400).json({ msg: "ID de usuario inválido" });
                return;
            }
            const categorias = yield db.Categoria.findAll({
                include: [
                    {
                        model: db.Presupuesto,
                        attributes: [], // No traemos los registros individuales, solo sumamos
                    }
                ],
                attributes: [
                    "id",
                    "nombre",
                    [
                        db.sequelize.literal(`(SELECT COALESCE(SUM(monto), 0) 
                              FROM "Presupuesto" 
                              WHERE "Presupuesto"."categoriaId" = "Categoria"."id" 
                              AND "Presupuesto"."usuarioId" = ${usuarioId})`),
                        "presupuestoTotal"
                    ],
                    [
                        db.sequelize.literal(`(SELECT COALESCE(SUM(monto), 0) 
                              FROM "Gasto" 
                              WHERE "Gasto"."categoriaId" = "Categoria"."id" 
                              AND "Gasto"."usuarioId" = ${usuarioId})`),
                        "gastoTotal"
                    ]
                ]
            });
            res.json({
                msg: "",
                categorias
            });
        }
        catch (error) {
            console.error("Error al obtener categorías:", error);
            res.status(500).json({ msg: "Error interno del servidor" });
        }
    }));
    // router.get("/", async (req : Request, resp : Response) => {
    //     const categorias = await db.Categoria.findAll()
    //     resp.json({
    //         msg: "",
    //         categorias : categorias
    //     })
    // })
    return [path, router];
};
exports.default = CategoriaController;
