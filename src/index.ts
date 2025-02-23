import express, { Express, Router } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import GastoController from "./Controllers/GastoControllers";
import UsuarioController from "./Controllers/UsuarioControllers";
import HistorialController from "./Controllers/HistorialControllers";
import CategoriaController from "./Controllers/CategoriaControllers";
import PasswordController from "./Controllers/PasswordController"; // 🔹 Agregamos el nuevo controlador

dotenv.config();

const app: Express = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 3000;

// Agregar controladores
const [gastoPath, gastoRouter] = GastoController();
const [usuarioPath, usuarioRouter] = UsuarioController();
const [categoriaPath, categoriaRouter] = CategoriaController();
const passwordRouter = PasswordController(); // 🔹 Nuevo controlador

const [historialPath, historialRouter] = HistorialController();

app.use(historialPath as string, historialRouter as Router);

app.use(gastoPath as string, gastoRouter as Router);
app.use(usuarioPath as string, usuarioRouter as Router);
app.use(categoriaPath as string, categoriaRouter as Router);
app.use("/password", passwordRouter);  // 🔹 Ahora la ruta de cambio de contraseña está activa

app.listen(port, () => {
    console.log(`[Server]: Servidor ejecutándose en puerto ${port}`);
});
