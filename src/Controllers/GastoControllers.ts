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
    router.get("/", async (req : Request, resp : Response) => {
        const gastos = await db.Gasto.findAll() //conectamos con la base de datos
        resp.json({
            msg : "",
            gastos : gastos
        })
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

    return [path, router]
}

export default GastoController;
