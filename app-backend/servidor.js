const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// TO DO: importar y usar módulo middle-ware CORS
const cors = require('cors')
const Usuario = require('./modelo')

const app = express()
const PORT = 4000 // Constantes de verdad se ponen siempre con mayúsculas

// Software intermediario papra la serialización y deserialización (parseo) automática
app.use(bodyParser.json())
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/db_usuarios')
const conexion = mongoose.connection
// once() es lo mismo que addEventListener()
conexion.once("open",function(){
    console.log("0-> EUREKA BRODA MODAFOCA, conexión con Mongoose");
    
})

app.listen( PORT,
    function(){
        console.log("1-> Servidor ejecutándose en " + PORT);
        
    })

const rutasAPI = express.Router()
// Y este obj va a hacer de intermediario en url /api/usuarios
app.use("/api/usuarios", rutasAPI)

// hhtp://127.0.0.1:4000/api/usuarios/registro  método POST
function recibirRegistroPost(req, res){ //req=peticiónHttp, res=respuesta Http
    console.log("2-> La petición Http empieza a ser procesada");
    
    //deberíamos recibir un JSON con el nuevo usuario
    //así que creamos un objeto Schema y le pasamos el JSON convertido en objeto de JS
    let nuevoUsuario = new Usuario( req.body )
    let promesaDeGuardado = nuevoUsuario.save()
    promesaDeGuardado.then( usuario => {
        console.log("4-> Se ha registrado en bbdd");
        res.status(200).json({
            "usuario": "Creado satisfactoriamente"
        })
    })
    promesaDeGuardado.catch( error => {
        console.log("4-> El registro ha fallado");
        
        res.status(400).send("El registro ha fallado")
    } )
    console.log("3-> La petición HTTP ha sido procesada");
    
}

rutasAPI.route("/registro").post(recibirRegistroPost)

rutasAPI.route("/").get(function(reqPeticionHttp, resRespuestaHttp){
    // Pide tooooda la colección e invoca a esta callback o el error
    // Invoca la query de mongo db.usuarios.find()
    Usuario.find( function(err, coleccionUsuarios ) {
        if(err){
            console.log(err);
        } else{
            // Pedimos devolver la colección en formato JSON
            resRespuestaHttp.json(coleccionUsuarios)
        }
    })
})

console.log('Una prueba muy divertida para ver el orden de las llamadas');
