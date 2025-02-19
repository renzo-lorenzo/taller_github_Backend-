import express, {Request, Response} from "express"
const db = require("../DAO/models")

const GastoController = () => {
    const path  = "/gastos"

    const router = express.Router()

    // Operacion para listar gastos
    router.get("/", async (req : Request, resp : Response) => {
        const gastos = await db.Gasto.findAll() // Conectamos con la base de datos
        resp.json({
            msg : "",
            gastos : gastos
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
       router.post("/", async (req: Request, resp, Respónse) => {
            const nuevoGasto = req.body

            const gastoCreado = await db.Gasto.create({
                fecha : nuevoGasto.fecha,
                categoriaId : nuevoGasto.categoriaId,
                descripcion : nuevoGasto.descripcion,
                recurrente : nuevoGasto.recurrente,
                monto : 0
            })
            resp.json({
                msg : "",
                gasto : gastoCreado
            })
       })
    })
    return [path, router]

}

export default GastoController;