import express, {Request, Response} from "express"
const db = require("../DAO/models")

const HistorialController = () => {
    const path  = "/historial"

    const router = express.Router()

    /*
    Endpoint de obtencion historial
    Path : "/historial/"
    Metodo : GET
    Output:
    {
        msg : "",
        historial : []
    }
    */
    router.get("/", async (req : Request, resp : Response) => {
        const historial = await db.Historial.findAll({
            include: [
                {
                    model : db.Usuario,
                    attributes: ["nombre", "username"]
                }
            ]
        }) //conectamos con la base de datos
        resp.json({
            msg : "",
            historial : historial
        })
    })

    /*
    Endpoint de registro de acciones al historial
    Path : "/historial/"
    Metodo : POST
    Input :
    - Params (URL):
        usuarioId : number
        accion : string
    Output:
    {
        msg : ""
    }
    */

    router.post("/", async (req: Request, resp: Response): Promise<void> => {
        try {
            const { usuarioId, accion } = req.body;
    
            // Validar que los campos requeridos estén presentes
            if (!usuarioId || !accion) {
                resp.status(400).json({ msg: "usuarioId y accion son obligatorios" });
                return
            }
    
            // Verificar si el usuario existe en la BD antes de registrar la acción
            const usuarioExiste = await db.Usuario.findByPk(usuarioId);
            if (!usuarioExiste) {
                resp.status(404).json({ msg: "Usuario no encontrado" });
                return
            }
    
            // Obtener la fecha y hora actual en formato adecuado
            const fechaActual = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
            const horaActual = new Date().toLocaleTimeString("es-ES", { // "HH:MM"
                hour12: false, 
                hour: "2-digit", 
                minute: "2-digit"
            });
    
            // Insertar el nuevo registro en la tabla `Historial`
            await db.Historial.create({
                usuarioId,
                fecha: fechaActual,
                hora: horaActual,
                accion
            });
    
            resp.status(201).json({ msg: "" });
            return;
    
        } catch (error) {
            console.error("Error al registrar en el historial:", error);
            resp.status(500).json({ msg: "Error interno del servidor" });
            return;
        }
    });

    return [path, router]

}

export default HistorialController;