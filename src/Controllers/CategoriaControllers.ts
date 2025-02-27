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
    router.get("/usuario/:id", async (req: Request, res: Response): Promise<void> => {
        try {
            const usuarioId = Number(req.params.id); // Obtener el ID del usuario de la URL
    
            if (isNaN(usuarioId)) {
                res.status(400).json({ msg: "ID de usuario inválido" });
                return;
            }
    
            const categorias = await db.Categoria.findAll({
                include: [
                    {
                        model: db.Presupuesto,
                        attributes: [], // No traemos los registros individuales, solo sumamos
                    }
                ],
                attributes: [
                    "id",
                    "nombre",
                    [
                        db.sequelize.literal(
                            `(SELECT COALESCE(SUM(monto), 0) 
                              FROM "Presupuesto" 
                              WHERE "Presupuesto"."categoriaId" = "Categoria"."id" 
                              AND "Presupuesto"."usuarioId" = ${usuarioId})`
                        ),
                        "presupuestoTotal"
                    ],
                    [
                        db.sequelize.literal(
                            `(SELECT COALESCE(SUM(monto), 0) 
                              FROM "Gasto" 
                              WHERE "Gasto"."categoriaId" = "Categoria"."id" 
                              AND "Gasto"."usuarioId" = ${usuarioId})`
                        ),
                        "gastoTotal"
                    ]
                ]
            });
    
            res.json({
                msg: "",
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