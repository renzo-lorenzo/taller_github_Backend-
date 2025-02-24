import express, {Request, Response} from "express"
const db = require("../DAO/models")

const PresupuestoController = () => {
    const path  = "/presupuesto"

    const router = express.Router()

    /*
    Endpoint de listado de presupuestos
    Path : "/presupuesto/"
    Metodo : GET
    Output:
    {
        msg : "",
        presupuestos : []
    }
    */
    router.get("/", async (req : Request, resp : Response) => {
        const presupuestos = await db.Presupuesto.findAll({
            include: [
                {
                    model : db.Categoria,
                    as: "Categoria",
                    attributes: ["nombre"]
                }
            ]
        }) //conectamos con la base de datos
        resp.json({
            msg : "",
            presupuestos : presupuestos
        })
    })

    /*
    Endpoint de registro de presupuesto
    Path : "/presupuesto/"
    Metodo : POST
    Input :
    - Body (JSON):
    {
        categoriaId : numero,
        monto : numero
    }
    Output:
    {
        msg : ""
    }
    */

    router.post("/", async (req: Request, resp: Response) => {
        console.log(req.body);

        const { categoriaId, monto } = req.body;

        if (!categoriaId || !monto ) {
            resp.json({ msg: "Todos los campos son obligatorios" });
            return;
        }

        const pptoCreado = await db.Presupuesto.create({
            categoriaId,
            monto
        });

        resp.json({ msg: "" });
        return;
    });

    /*
    Endpoint de Edición de Presupuesto
    Path : "/presupuesto/:id"
    Metodo : PUT
    Input :
    - Params (URL):
        id : número (ID del presupuesto a editar)
    - Body (JSON):
    {
        categoriaId : numero,
        monto : numero
    }
    Output:
    {
        msg : ""
    }
    */

    router.put("/:id", async (req: Request, resp: Response): Promise<void> => {
        try{
            const id = Number(req.params.id)
            if (isNaN(id)) {
                resp.status(400).json({ msg: "ID inválido" });
                return;
            }
            const { categoriaId, monto } = req.body;

            const ppto = await db.Presupuesto.findByPk(id);
            if (!ppto) {
                resp.json({ msg: "Presupuesto no encontrado" });
                return;
            }

            await ppto.update({
                categoriaId,
                monto
            })     

            resp.json({
                msg:""
            })
            return;

        } catch(error){
            console.error("Error al actualizar presupuesto:", error);
            resp.json({ msg: "Error interno del servidor" });
            return;
        }
    });

    /*
    Endpoint de Eliminación de Presupuesto
    Path : "/presupuesto/:id"
    Metodo : DELETE
    Input :
    - Params (URL):
        id : número (ID del presupuesto a eliminar)
    Output:
    {
        msg : ""
    }
    */

    router.delete("/:id", async (req: Request, resp: Response): Promise<void>=> {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                resp.status(400).json({ msg: "ID inválido" });
                return
            }
    
            const ppto = await db.Presupuesto.findByPk(id);
            if (!ppto) {
                resp.json({ msg: "Presupuesto no encontrado" });
                return
            }
    
            await ppto.destroy();
    
            resp.json({ msg: "" });
            return
    
        } catch (error) {
            console.error("Error al eliminar presupuesto:", error);
            resp.status(500).json({ msg: "Error interno del servidor" });
            return
        }
    });

    return [path, router]

}

export default PresupuestoController;