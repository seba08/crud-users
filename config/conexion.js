const conexion = require("mongoose")

const uri = 'mongodb://localhost:27017/crud-users'
conexion.connect(uri, (err)=>{

    if(err){
        console.log("Error en la conexión: ", err);
    }else{
        console.log("Conexión Exitosa...!")
    }
})

module.exports = conexion;