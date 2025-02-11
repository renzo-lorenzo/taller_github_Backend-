import express, {Request, Response} from "express"

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
    router.post("/login", (req : Request, resp: Response) => {
        console.log(req.body)
        const usuario = req.body.usuario
        const password = req.body.password
    
        if(usuario == "20211532@aloe.ulima.edu.pe" && password == "123"){
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