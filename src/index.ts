import express, { Express, Router } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import GastoController from "./Controllers/GastoControllers";
import UsuarioController from "./Controllers/UsuarioControllers";
import HistorialController from "./Controllers/HistorialControllers";
import CategoriaController from "./Controllers/CategoriaControllers";
import PasswordController from "./Controllers/PasswordController";
import AdminController from "./Controllers/AdminController";
import DashboardController from "./Controllers/DashboardController";
import PresupuestoController from "./Controllers/PresupuestoControllers";

dotenv.config();

const app: Express = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

// Agregar controladores existentes
const [gastoPath, gastoRouter] = GastoController();
const [usuarioPath, usuarioRouter] = UsuarioController();
const [categoriaPath, categoriaRouter] = CategoriaController();
const passwordRouter = PasswordController();

const [historialPath, historialRouter] = HistorialController();
app.use(historialPath as string, historialRouter as Router);

const [presupuestoPath, presupuestoRouter] = PresupuestoController();
app.use(presupuestoPath as string, presupuestoRouter as Router);

const [adminPath, adminRouter] = AdminController();
const [dashboardPath, dashboardRouter] = DashboardController();

app.use(gastoPath as string, gastoRouter as Router);
app.use(usuarioPath as string, usuarioRouter as Router);
app.use(categoriaPath as string, categoriaRouter as Router);
app.use("/password", passwordRouter);
app.use(adminPath as string, adminRouter as Router);
app.use(dashboardPath as string, dashboardRouter as Router);

app.listen(port, () => {
  console.log(`[Server]: Servidor ejecutándose en puerto ${port}`);
});
