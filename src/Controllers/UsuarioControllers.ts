import express, {Request, Response} from "express"
import { where } from "sequelize"
const db = require("../DAO/models")

const UsuarioController = () => {
    const path  = "/usuarios" // AHORA LA RUTA ES "/usuarios"

    const router = express.Router()

    // Endpoint Login
    // Ruta : "/login"
    // Method: POST
    // Form: usuario, password
    // Output:
    // En el caso que login sea correcto:
    // {
    //      "msg" : ""
    // }
    // En el caso de error sea login:
    // {
    //      "msg" : "Error en login"
    // }
    router.post("/login", async (req : Request, resp: Response) => {
        console.log(req.body)
        const usuario = req.body.usuario
        const password = req.body.password

        const usuarios = await db.Usuario.findAll({
            where : {
                username : usuario,
                password : password,
                estado : true
            }
        })
        //console.log(usuarios)
    
        if(usuarios.length > 0){
            // Login es correcto
            resp.json({ // el json es lo usamos ahora para convertirlo a string
                msg : ""
            })
        }
        else{
            // Login es incorrecto
            resp.json({
                msg : "Error en login"
            })
        }
    })
    return [path, router]
}

export default UsuarioController