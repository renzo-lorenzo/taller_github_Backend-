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

        const usuarioEncontrado = await db.Usuario.findOne({
            where: {
                username: usuario, 
                password: password,
                estado: true
            }
        });
        console.log(" Usuario encontrado:", usuarioEncontrado); //verificamos qué devuelve
    
        if(usuarioEncontrado){
            // Login es correcto
            resp.json({
                id: usuarioEncontrado.id, 
                nombre: usuarioEncontrado.nombre, 
                usuario: usuarioEncontrado.username,  
                msg: ""
            });
        }
        else{
            // Login es incorrecto
            resp.json({
                msg : "Error en login"
            })
        }
    })

    router.get("/:id", async (req: Request, resp: Response) => {
        const userId = req.params.id;
    
        const usuario = await db.Usuario.findByPk(userId, {
            attributes: ["id", "nombre", "username", "password"]
        });
    
        if (usuario) {
            resp.json(usuario);
        } else {
            resp.status(404).json({ msg: "Usuario no encontrado" });
        }
    });

    // Endpoint de registro de usuarios
    // Path : "/"
    // Method: POST
    // Form: nombre, usuario, password
    // Output:
    // En el caso que login sea correcto:
    // {
    //      "msg" : ""
    // }
    // En el caso de error (osea vacio):
    // {
    //      "msg" : "Todos los campos son obligatorios"
    // }
    router.post("/", async (req: Request, resp: Response) => {
        console.log(req.body); //verificamos los datos recibidos
    
        const usuario = req.body.usuario;
        const nombre = req.body.nombre;
        const password = req.body.password;
    
        if (!usuario || !nombre || !password) {         // esto es para evitar campos vacíos
            resp.json({ msg: "Todos los campos son obligatorios" });
            return;
        }
    
        const usuarioCreado = await db.Usuario.create({ //creamos el usuario en la base de datos
            nombre: nombre,
            username: usuario, // Asegúrate de que la DB usa "username" y no "correo"
            password: password,
            estado: true, // Estado por defecto
        });
    
        resp.json({ msg: "" }); // Igual que en login
    });

    return [path, router]
}

export default UsuarioController