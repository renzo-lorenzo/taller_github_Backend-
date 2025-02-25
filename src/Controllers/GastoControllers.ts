import express, { Request, Response } from "express"
const db = require("../DAO/models")

const GastoController = () => {
    const path  = "/gastos"

    const router = express.Router()

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

    /* 
    Agregado del endpoint para la alerta:
    Endpoint: GET /gastos/alertas/:usuarioId
    Este endpoint verifica si los egresos del usuario han superado un umbral.
    */
    router.get("/alertas/:usuarioId", async (req: Request, resp: Response): Promise<void> => {
        try {
            const { usuarioId } = req.params;
            const limiteGastos = 1000; // Umbral de alerta

            // Suponiendo que el modelo Gasto tiene un método "sum" para sumar montos
            const totalGastos = await db.Gasto.sum("monto", { where: { usuarioId } });

            if (totalGastos > limiteGastos) {
                resp.json({
                    alerta: true,
                    mensaje: "Has superado tu límite de gastos"
                });
                return
            }

            resp.json({
                alerta: false,
                mensaje: "Tus gastos están dentro del límite"
            });
        } catch (error) {
            console.error("Error al verificar alerta:", error);
            resp.status(500).json({
                alerta: false,
                mensaje: "Error al verificar alerta"
            });
        }
    });

    return [path, router]
}

export default GastoController;
