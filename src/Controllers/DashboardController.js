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
const DashboardController = () => {
    const router = (0, express_1.Router)();
    const path = "/dashboard";
    // Endpoint para estadísticas de usuarios
    router.get("/users-stats", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Contar usuarios con rol 'User'
            const totalUsers = yield db.Usuario.count({
                where: { rol: 'User' }
            });
            // Obtener registros mensuales
            const monthlySignups = yield db.Usuario.findAll({
                attributes: [
                    [db.sequelize.fn('DATE_TRUNC', 'month', db.sequelize.col('createdAt')), 'month'],
                    [db.sequelize.fn('COUNT', 'id'), 'count']
                ],
                where: { rol: 'User' },
                group: ['month'],
                order: [['month', 'ASC']],
                raw: true // Para obtener datos simples
            });
            // Formatear respuesta
            res.json({
                totalUsers,
                monthlySignups: monthlySignups.map((item) => ({
                    month: item.month,
                    count: item.count
                }))
            });
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Error:", error.message);
                res.status(500).json({ error: error.message });
                return;
            }
            else {
                console.error("Error desconocido:", error);
                res.status(500).json({ error: "Ocurrió un error inesperado" });
                return;
            }
        }
    }));
    return [path, router];
};
exports.default = DashboardController;
