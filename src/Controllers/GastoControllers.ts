import express, { Request, Response } from "express"
const db = require("../DAO/models")
const { Op } = require("sequelize");

const GastoController = () => {
    const path  = "/gastos"

    const router = express.Router()

    router.get("/", async (req: Request, resp: Response) => {
        const { orden } = req.query;
        const orderBy = orden === "monto" ? [["monto", "ASC"]] : [["fecha", "ASC"]];
        const gastos = await db.Gasto.findAll({ order: orderBy });
        resp.json({ msg: "", gastos });
    });



    // Operacion para listar gastos
    router.get("/usuario/:id", async (req : Request, resp : Response) => {
        try {
            const usuarioId = Number(req.params.id); // Obtiene usuarioId desde la URL
            if (isNaN(usuarioId)) {
                resp.status(400).json({ msg: "ID de usuario inválido" });
                return;
            }
            const gastos = await db.Gasto.findAll({
                where: { usuarioId }
            }) //conectamos con la base de datos
            resp.json({
                msg : "",
                gastos : gastos
            });
        } catch (error) {
            console.error("Error al obtener gastos:", error);
            resp.status(500).json({ msg: "Error interno del servidor" });
        }
    })

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
    router.post("/", async (req: Request, resp: Response) => {
        const nuevoGasto = req.body;
        console.log(nuevoGasto);
        const gastoCreado = await db.Gasto.create({
            fecha: nuevoGasto.fecha,
            categoriaId: nuevoGasto.categoriaId,
            descripcion: nuevoGasto.descripcion,
            recurrente: nuevoGasto.recurrente === "Sí" ? "Sí" : "No",
            monto: nuevoGasto.monto,
            usuarioId:nuevoGasto.usuarioId
        });
    
        resp.json({ msg: "", gasto: gastoCreado });
    });

    router.get("/", async (req: Request, resp: Response) => {
        try {
            const { filtro, valor } = req.query;

            console.log("Parámetros recibidos en el backend:", { filtro, valor });

            if (!filtro || !valor) {
                console.log("Falta el filtro o el valor, devolviendo todos los gastos");
                const gastos = await db.Gasto.findAll();
                resp.json({ msg: "", gastos });
            }

            let whereClause: any = {};

            if (filtro === "categoria") {
                whereClause.categoriaId = { [Op.eq]: parseInt(valor as string, 10) }; // 🔹 Comparación exacta
            } else if (filtro === "monto") {
                whereClause.monto = { [Op.eq]: parseFloat(valor as string) }; // 🔹 Comparación exacta
            } else if (filtro === "fecha") {
                whereClause.fecha = { [Op.eq]: new Date(valor as string) }; // 🔹 Conversión a Date
            }

            console.log("WhereClause construido:", JSON.stringify(whereClause, null, 2));

            const gastos = await db.Gasto.findAll({ where: whereClause });

            console.log("🔍 Gastos filtrados encontrados:", gastos.length);

            resp.json({ msg: "", gastos });

        } catch (error) {
            console.error("Error al filtrar gastos:", error);
            resp.status(500).json({ msg: "Error al filtrar gastos" });
        }
    });

    router.post("/eliminar", async (req: Request, resp: Response): Promise<void> => {
        try {
            const { id } = req.body;

            if (!id || isNaN(id)) {
                resp.status(400).json({ msg: "ID inválido o no proporcionado" });
                return;
            }

            const gasto = await db.Gasto.findOne({ where: { id } });

            if (!gasto) {
                resp.status(404).json({ msg: "Gasto no encontrado" });
                return;
            }

            await gasto.destroy();
            resp.json({ msg: "Gasto eliminado correctamente" });
        } catch (error: any) {
            console.error("Error al eliminar gasto:", error);
            resp.status(500).json({ msg: "Error del servidor" });
        }
    });

    return [path, router]
}

export default GastoController;
