import express, { Request, Response } from "express";
import bcrypt from "bcrypt"; // Importamos bcrypt para comparar contraseñas
import { where } from "sequelize";
const db = require("../DAO/models");

const UsuarioController = () => {
    const path  = "/usuarios"
    const router = express.Router();

    /*
    Endpoint de listado de usuarios
    Path : "/usuarios/"
    Metodo : GET
    Output:
    {
        msg : "",
        usuario : [
            {
                id: 1
                nombre : "",
                username : "",
                password : "",
                estado : true,
                rol: "User"
            }
        ]
    }
    */
    router.get("/", async (req : Request, resp : Response) => {
        const usuarios = await db.Usuario.findAll() //conectamos con la base de datos
        resp.json({
            msg : "",
            usuario : usuarios
        })
    })

    /*
    Endpoint de login
    Path : "/usuarios/login"
    Metodo : POST
    Input :
    - Body (JSON):
    {
        usuario : "",
        password : ""
    }
    Output:
    {
        id : 1,
        nombre : "",
        username : "",
        estado : true,
        rol: "",
        msg : ""
    }
    */
    router.post("/login", async (req: Request, resp: Response) => {
        console.log(req.body);
        const usuario = req.body.usuario;
        const password = req.body.password;

        // Buscar usuario sin comparar contraseña en la consulta
        const usuarioEncontrado = await db.Usuario.findOne({
            where: {
                username: usuario,
                estado: true
            }
        });

        console.log("Usuario encontrado:", usuarioEncontrado);

        if (usuarioEncontrado) {
            // Comparar contraseña ingresada con la almacenada (encriptada)
            const passwordValida = await bcrypt.compare(password, usuarioEncontrado.password);

            if (passwordValida) {
                // Login correcto
                resp.json({
                    id: usuarioEncontrado.id,
                    nombre: usuarioEncontrado.nombre,
                    username: usuarioEncontrado.username,
                    estado: usuarioEncontrado.estado,
                    rol: usuarioEncontrado.rol,
                    msg: ""
                });
            } else {
                // Contraseña incorrecta
                resp.json({ msg: "Error en login" });
            }
        } else {
            // Usuario no encontrado
            resp.json({ msg: "Usuario no encontrado" });
        }
    });
    

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

    /*
    Endpoint de registro de usuarios
    Path : "/usuarios/register"
    Metodo : POST
    Input :
    - Body (JSON):
    {
        nombre : "",
        username : "",
        password : "",
        estado : true,
        rol: "User"
    }
    Output:
    {
        msg : ""
    }
    */

    router.post("/register", async (req: Request, resp: Response) => {
        console.log(req.body);

        const { username, nombre, password } = req.body;

        if (!username || !nombre || !password ) {
            resp.json({ msg: "Todos los campos son obligatorios" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const usuarioCreado = await db.Usuario.create({
            nombre: nombre,
            username: username,
            password: hashedPassword,
            estado: true,
            rol : "User"
        });

        resp.json({ msg: "" });
    });

    /*
    Endpoint de registro de usuarios
    Path : "/usuarios/"
    Metodo : POST
    Input :
    - Body (JSON):
    {
        nombre : "",
        username : "",
        password : "",
        estado : true,
        rol : ""
    }
    Output:
    {
        msg : ""
    }
    */

    router.post("/", async (req: Request, resp: Response) => {
        console.log(req.body);

        const { username, nombre, password, rol } = req.body;

        if (!username || !nombre || !password || !rol) {
            resp.json({ msg: "Todos los campos son obligatorios" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const usuarioCreado = await db.Usuario.create({
            nombre: nombre,
            username: username,
            password: hashedPassword,
            estado: true,
            rol: rol
        });

        resp.json({ msg: "" });
    });

    /*
    Endpoint de Edición Usuario
    Path : "/usuarios/:id"
    Metodo : PUT
    Input :
    - Params (URL):
        id : número (ID del usuario a editar)
    - Body (JSON):
    {
        nombre : "",
        username : "",
        password : "",
        estado : true,
        rol : ""
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
            const { nombre, username, password, estado, rol } = req.body;

            const usuario = await db.Usuario.findByPk(id);
            if (!usuario) {
                resp.json({ msg: "Usuario no encontrado" });
                return;
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await usuario.update({
                nombre : nombre,
                username : username,
                password : hashedPassword,
                estado : estado,
                rol : rol
            })     

            resp.json({
                msg:""
            })
            return;

        } catch(error){
            console.error("Error al actualizar usuario:", error);
            resp.json({ msg: "Error interno del servidor" });
            return;
        }
    });

    /*
    Endpoint de Eliminación de Usuario
    Path : "/usuarios/:id"
    Metodo : DELETE
    Input :
    - Params (URL):
        id : número (ID del usuario a eliminar)
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
    
            const usuario = await db.Usuario.findByPk(id);
            if (!usuario) {
                resp.json({ msg: "Usuario no encontrado" });
                return
            }
    
            await usuario.destroy();
    
            resp.json({ msg: "" });
            return
    
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            resp.status(500).json({ msg: "Error interno del servidor" });
            return
        }
    });

    return [path,router];
};

export default UsuarioController;
