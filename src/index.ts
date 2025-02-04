import express, {Express, Request, Response} from "express"
import dotenv from "dotenv"
import { emitWarning } from "process"

dotenv.config()

const app : Express = express()
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

app.listen(port, () => {
    console.log(`[Server]: Servidor ejecutandose en puerto ${port}`)
})