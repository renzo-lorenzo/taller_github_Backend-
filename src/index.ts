import express, {Express, Request, Response, Router} from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import GastoController from "./Controllers/GastoControllers"
import UsuarioController from "./Controllers/UsuarioControllers"

dotenv.config()

const app : Express = express()
app.use(bodyParser.json())              //por json
app.use(bodyParser.urlencoded({         //por formulario
    extended : true
}))
app.use(cors()) // APLICACION DE CORS

const port = process.env.PORT || 3000

const [gastoPath, gastoRouter] = GastoController()
const [usuarioPath, usuarioRouter] = UsuarioController()

app.use(gastoPath as string, gastoRouter as Router)
app.use(usuarioPath as string, usuarioRouter as Router)

app.listen(port, () => {
    console.log(`[Server]: Servidor ejecutandose en puerto ${port}`)
})