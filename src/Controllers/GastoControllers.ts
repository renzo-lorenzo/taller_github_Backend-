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

        /*resp.json({
            msg: "",
            gastos : [
                {
                    fecha : "12/12/2024",
                    categoria : "Ocio",
                    descripcion : "La Niebla, libro de Steven King",
                    recurrente : "No",
                    monto : 29.99
                }
            ]
        })*/
    })
    return [path, router]

}

export default GastoController;