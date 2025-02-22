import express, { Express, Router } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import GastoController from "./Controllers/GastoControllers";
import UsuarioController from "./Controllers/UsuarioControllers";
import CategoriaController from "./Controllers/CategoriaControllers";
import PasswordController from "./Controllers/PasswordController"; // 🔹 Controlador de contraseñas
import AdminController from "./Controllers/AdminController"; // 🔹 Nuevo controlador de administrador
import DashboardController from "./Controllers/DashboardController"; // 🔹 Nuevo controlador de dashboard
import { isAdmin } from "./Middlewares/authMiddleware"; // 🔹 Middleware de autenticación

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
const passwordRouter = PasswordController(); // 🔹 Controlador de contraseñas

// Agregar nuevos controladores de administrador
const adminRouter = Router();
const dashboardRouter = Router();

// Rutas de administrador
adminRouter.get("/users", isAdmin, AdminController.getAllUsers);
adminRouter.post("/users", isAdmin, AdminController.createAdminUser);
adminRouter.get("/users/:id", isAdmin, AdminController.getAdminUserById);
adminRouter.put("/users/:id", isAdmin, AdminController.updateAdminUser);
adminRouter.delete("/users/:id", isAdmin, AdminController.deleteAdminUser);
adminRouter.get("/history", isAdmin, AdminController.getAdminHistory);

// Rutas de dashboard
dashboardRouter.get("/", isAdmin, DashboardController.getDashboardData);

// Montar rutas
app.use(gastoPath as string, gastoRouter as Router);
app.use(usuarioPath as string, usuarioRouter as Router);
app.use(categoriaPath as string, categoriaRouter as Router);
app.use("/password", passwordRouter); // 🔹 Ruta de cambio de contraseña
app.use("/admin", adminRouter); // 🔹 Rutas de administrador
app.use("/dashboard", dashboardRouter); // 🔹 Rutas de dashboard

app.listen(port, () => {
    console.log(`[Server]: Servidor ejecutándose en puerto ${port}`);
});
