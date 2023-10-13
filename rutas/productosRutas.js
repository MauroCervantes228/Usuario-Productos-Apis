var ruta=require("express").Router();
var subirArchivos=require("../middlewares/subirArchivos");
var {buscarPorID, mostrarProductos, nuevoProducto, modificarProducto, borrarProducto}=require("../bd/productosBD");

ruta.get("/productos",async(req, res)=>{
    var productos=await mostrarProductos();
    res.render("productos/mostrarProductos",{productos});
});

ruta.get("/nuevoproducto",async(req,res)=>{
    res.render("productos/nuevoProducto");
});

ruta.post("/nuevoproducto",subirArchivos(),async(req,res)=>{
    console.log(req.file);
    req.body.foto=req.file.originalname;
    console.log(req.body);
    var error=await nuevoProducto(req.body);
    res.redirect("/productos");//cambiarlo a que me redirija a mostrar productos
});

ruta.get("/editarProducto/:id",async(req,res)=>{
    var product = await buscarPorID(req.params.id);
    res.render("productos/modificarProductos",{product});
});

ruta.post("/editarProducto",subirArchivos(),async(req,res)=>{
    console.log(req.file);
    req.body.foto=req.file.originalname;
    console.log(req.body);
    var error=await modificarProducto(req.body);
    res.redirect("/productos");//cambiarlo a que me dirija a mostrar productos
});

ruta.get("/borrarProducto/:id",async(req,res)=>{
    await borrarProducto(req.params.id);
    res.redirect("/productos");// cambiarlo a que me dirja a mostrar productos
});

module.exports=ruta;