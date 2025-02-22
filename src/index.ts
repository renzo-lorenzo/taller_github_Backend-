import express, { Express, Router } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import GastoController from "./Controllers/GastoControllers";
import UsuarioController from "./Controllers/UsuarioControllers";
import CategoriaController from "./Controllers/CategoriaControllers";
import PasswordController from "./Controllers/PasswordController";
import AdminController from "./Controllers/AdminController"; // 🔹 Nuevo controlador
import DashboardController from "./Controllers/DashboardController"; // 🔹 Nuevo controlador

dotenv.config();

const app: Express = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 3000;

// Agregar controladores existentes
const [gastoPath, gastoRouter] = GastoController();
const [usuarioPath, usuarioRouter] = UsuarioController();
const [categoriaPath, categoriaRouter] = CategoriaController();
const passwordRouter = PasswordController();

// Agregar nuevos controladores
const [adminPath, adminRouter] = AdminController(); // 🔹 Nuevo controlador
const [dashboardPath, dashboardRouter] = DashboardController(); // 🔹 Nuevo controlador

// Montar rutas
app.use(gastoPath as string, gastoRouter as Router);
app.use(usuarioPath as string, usuarioRouter as Router);
app.use(categoriaPath as string, categoriaRouter as Router);
app.use("/password", passwordRouter);
app.use(adminPath as string, adminRouter as Router); // 🔹 Montar rutas de administrador
app.use(dashboardPath as string, dashboardRouter as Router); // 🔹 Montar rutas de dashboard

app.listen(port, () => {
  console.log(`[Server]: Servidor ejecutándose en puerto ${port}`);
});
