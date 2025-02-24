import express, {Request, Response } from "express"
const db = require("../DAO/models")

const CategoriaController = () => {
    const path = "/categorias"

    const router = express.Router()

    /*
    Endpoint de listado de categorias con presupuesto total
    Path : "/categorias/"
    Metodo : GET
    Output:
    {
        msg : "",
        categorias : [
            {
                id: 1
                nombre : "Nombre de Categoria",
                PresupuestoTotal : Suma de presupuestos con misma categoria
            }
        ]
    }
    */
    router.get("/", async (req: Request, res: Response) => {
        try {
            const categorias = await db.Categoria.findAll({
                include: [
                    {
                        model: db.Presupuesto,
                        attributes: [] // No traemos los registros individuales, solo sumamos
                    }
                ],
                attributes: [
                    "id",
                    "nombre",
                    [
                        db.sequelize.literal(
                            "(SELECT COALESCE(SUM(monto), 0) FROM \"Presupuesto\" WHERE \"Presupuesto\".\"categoriaId\" = \"Categoria\".\"id\")"
                        ),
                        "presupuestoTotal"
                    ],
                    [
                        db.sequelize.literal(
                            "(SELECT COALESCE(SUM(monto), 0) FROM \"Gasto\" WHERE \"Gasto\".\"categoriaId\" = \"Categoria\".\"id\")"
                        ),
                        "gastoTotal"
                    ]
                ]
            });
    
            res.json({
                msg:"",
                categorias
            });
        } catch (error) {
            console.error("Error al obtener categorías:", error);
            res.status(500).json({ msg: "Error interno del servidor" });
        }
    });

    // router.get("/", async (req : Request, resp : Response) => {
    //     const categorias = await db.Categoria.findAll()
    //     resp.json({
    //         msg: "",
    //         categorias : categorias
    //     })
    // })

    return [path,router]
}

export default CategoriaController