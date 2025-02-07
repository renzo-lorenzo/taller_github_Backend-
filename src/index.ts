import express, {Express, Request, Response} from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import { emitWarning } from "process"
import cors from "cors"

dotenv.config()

const app : Express = express()
app.use(bodyParser.json())              //por json
app.use(bodyParser.urlencoded({         //por formulario
    extended : true
}))
app.use(cors()) // APLICACION DE CORS

const port = process.env.PORT || 3000

// Endpoint
// Ruta: "/"
// "Tipo (method): GET 
app.get("/", (req : Request, resp : Response) => {
    resp.send("<h1>HOLA PW</h1>")
})

app.get("/ep1", (req : Request, resp : Response) => {
    resp.send("Endpoint 2")
})

// Endpoint
// Ruta: "/ep2"
// "Tipo (method): GET
// Path params: nombre
app.get("/ep2/:nombre", (req : Request, resp : Response) => {
    resp.send(`Hola ${req.params.nombre}`)
})

// Endpoint
// Ruta: "/ep3"
// Tipo (method): GET
// Query params: nombre, apellido
app.get("/ep3", (req : Request, resp : Response) => {
    resp.send(`Hola ${req.query.nombre} ${req.query.apellido}`)
})

// Endpoint Login
// Ruta : "/login"
// Method: GET
// Query params: usuario, password
// Output:
// En el caso que login sea correcto:
// {
//      "msg" : ""
// }
// En el caso de error sea login:
// {
//      "msg" : "Error en login"
// }
app.post("/login", (req : Request, resp: Response) => {
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

app.listen(port, () => {
    console.log(`[Server]: Servidor ejecutandose en puerto ${port}`)
})