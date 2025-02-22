import express, {Request, Response} from "express"
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
    Path : "/gasto"
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

    return [path, router]

}

export default GastoController;