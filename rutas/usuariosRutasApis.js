var ruta=require("express").Router();
var subirArchivos=require("../middlewares/subirArchivos");
var {mostrarUsuarios, nuevoUsuario, modificarUsuario, buscarPorID, borrarUsuario}=require("../bd/usuariosBD");

ruta.get("/api/mostrarUsuarios",async(req, res)=>{
    var usuarios=await mostrarUsuarios();
    //res.render("usuarios/mostrar",{usuarios});
    if(usuarios.length>0)
        res.status(200).json(usuarios); // res es para que muestre algo en pantalla 
    else{
        res.status(400).json("No hay usuarios");
    }    
});

ruta.post("/api/nuevousuario",subirArchivos(),async(req,res)=>{
    //console.log(req.body);
    req.body.foto=req.file.originalname;
    var error=await nuevoUsuario(req.body);
    console.log(error);
    if (error==0) {
        res.status(200).json("Usuario Registrado");
    }
    else{
        res.status(400).json("Datos Incorrectos");
    }
});

ruta.get("/api/buscarUsuarioPorId/:id",async(req,res)=>{
    var user = await buscarPorID(req.params.id);//aqui recibo solo un usuario por id por eso es user
    //res.render("usuarios/modificar",{user});
    if (user=="") {
        res.status(400).json("No se encontró ese usuario");
    }
    else{
        res.status(200).json(user);
    }
});

ruta.post("/api/editarUsuario",subirArchivos(),async(req,res)=>{
    //console.log(req.body);
    req.body.foto=req.file.originalname;
    var error=await modificarUsuario(req.body);
    if(error==0){
        res.status(200).json("Usuario Actualizado");
    }
    else{
        res.status(400).json("Error al actualizar el usuario");
    }
});

ruta.get("/api/borrarUsuario/:id",async(req,res)=>{
    var error=await borrarUsuario(req.params.id);
    if(error==0){
        res.status(200).json("Usuario Borrado");
    }
    else{
        res.status(400).json("Error al borrar el usuario");
    }
});

module.exports=ruta;