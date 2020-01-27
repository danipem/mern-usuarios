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
// http://localhost:4000/api/usuarios 
// Funcion para borrar//
//TODO: crear un una validacion si el USUARIO EXISTE
<<<<<<< HEAD
rutasAPI.route("/:identificador").delete(function (reqHttp,resHttp){
    let id = reqHttp.params.identificador;
    let consultaFindOne = Usuario.findById( { "_id": id} );
    //Ejecutamos la consulta para saber si hay uno
    consultaFindOne.exec((err, resDoc) => {
        if(err){
            // se devuelve un objeto para que no se quede en bucle el  POSTMAN..//
            resHttp.json( { "mensaje": "Error al buscar un usuario para eliminar," + err});
        }else{
            if(resDoc == null){
                // se devuelve un objeto para que no se quede en bucle el  POSTMAN..//
                resHttp.json( { "mensaje:": "No se ha encontrado el usuario"});
            }else{// Si no hay error y resDoc es distinto de null
                console.log("Se ha encontrado, ahora eliminar: " + resDoc);
                consultaFindOne.deleteOne().exec(
                    (err, resDoc2) => {
                        let msjResp = "";
                        if (resDoc2.deletedCount >= 1) {
                            msjResp = "Usuario ELIMINADO";
                        }else{
                            msjResp = "Usuario NO ELIMINADO";
                        }   
                        console.log(resDoc2);
                        resHttp.json( { "mensaje": msjResp});
                    });               
            }
        }
    });
=======
rutasAPI.route("/:id").delete(function(req,res){
    console.log("ha sido eliminado" + req.params.id);
    Usuario.findById(req.params.id).remove().exec();
    // se devuelve un objeto para que no se quede en bucle el  POSTMAN..//
    res.json({mensaje: "OK"});
>>>>>>> d6ebaeaed0b1593c2281c6af080ba2fa97257a56
});

//Funcion para acuralizar la tabla
//CODIGO PARA HACER EL UPDATE
//LET (cuando la varible varia) CONST (es constante sera siempre igual )
//req. recibe los datos que envia el usuario
//res. envia el resultado que envia el usuario
// el (.then) siempre hay que ponerlo cuado se genera una promesa
//findById: es una promesa
//GET: el metodO Get es para ver lo que se ha insertado  del POST (read/leer)
//POST: el metodo POST  vendria siendo un insert(BBDD) es para (crear/Create)
//PUT:  el metodo Put es para editar (Update/Replac)
//DELETE: el metodO Delete es para eliminar

rutasAPI.route("/editar/:id").put(function(req,res){
   let editarUsu =new Usuario(req.body);
   editarUsu._id = req.params.id;
   Usuario.findById(editarUsu._id, function(err,user){
       console.log("Usuario EDITADO")
       for(const prop in req.body){
           user[prop] = req.body[prop];
       }
       console.log(user)
       console.log(req.body)
       user.save();
       res.json({"mensaje": "FUE EDITADO"});// aqui se envia una respuesta JSON para que no se 
                                            // que en un bucle el POSTMAN.,/
   }).then(res=>res).catch(err=>err) 
});








console.log('Una prueba muy divertida para ver el orden de las llamadas');
