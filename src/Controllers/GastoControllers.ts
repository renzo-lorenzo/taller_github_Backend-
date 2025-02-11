import express, {Request, Response} from "express"

const GastoController = () => {
    const path  = "/gastos"

    const router = express.Router()

    // Operacion para listar gastos
    router.get("/", (req : Request, resp : Response) => {
        resp.json({
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
        })
    })
    return [path, router]

}

export default GastoController;