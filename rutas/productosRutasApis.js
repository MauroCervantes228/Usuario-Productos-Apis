var ruta=require("express").Router();
var subirArchivos=require("../middlewares/subirArchivos");
var {buscarPorID, mostrarProductos, nuevoProducto, modificarProducto, borrarProducto}=require("../bd/productosBD");

ruta.get("/api/productos",async(req, res)=>{
    var productos=await mostrarProductos();
    //res.render("productos/mostrarProductos",{productos});
    if (productos.length>0) {
        res.status(200).json(productos);
    }
    else{
        res.status(400).json("No hay productos");
    }
});

/*ruta.get("/nuevoproducto",async(req,res)=>{
    res.render("productos/nuevoProducto");
});*/

ruta.post("/api/nuevoproducto",subirArchivos(),async(req,res)=>{
    req.body.foto=req.file.originalname;
    var error=await nuevoProducto(req.body);
    console.log(error);
    if (error==0) {
        res.status(200).json("Producto Registrado");
    }
    else{
        res.status(400).json("Datos Incorrectos");
    }
});

ruta.get("/api/buscarProductoPorId/:id",async(req,res)=>{
    var product = await buscarPorID(req.params.id);
    if (product=="") {
        res.status(400).json("No se encontró ese producto");
    }
    else{
        res.status(200).json(product);
    }
});

ruta.post("/api/editarProducto",subirArchivos(),async(req,res)=>{
    //console.log(req.body);
    req.body.foto=req.file.originalname;
    var error=await modificarProducto(req.body);
    if (error==0) {
        res.status(200).json("Producto Actualizado");
    }
    else{
        res.status(400).json("Error al actualizar el producto");
    }
});

ruta.get("/api/borrarProducto/:id",async(req,res)=>{
    var error=await borrarProducto(req.params.id);
    if (error==0) {
        res.status(200).json("Producto Borrado");
    }
    else{
        res.status(400).json("Error al borrar el producto");
    }
});

module.exports=ruta;