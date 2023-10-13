var conexion=require("./conexion").conexionProductos;
var Productos=require("../modelos/Productos");

async function mostrarProductos(){
    var products=[];
    try {
        var productos=await conexion.get();
        productos.forEach(producto =>{
            var product=new Productos(producto.id, producto.data());
            if (product.bandera==0){
                products.push(product.obtenerDatosProducto());
        }
    })
    }
    catch(err){
        console.log("Error al recuperar productos de la BD" + err);
    }
    return products;
}

async function buscarPorID(id){
    var product;
    try{
        var producto=await conexion.doc(id).get();
        var productoObjeto=new Productos(producto.id, producto.data());
        if (productoObjeto.bandera==0){
            product=productoObjeto.obtenerDatosProducto();
        }
    }
    catch(err){
        console.log("Error al recuperar el producto"+err);
    }
    return product;
}

async function nuevoProducto(datos){
    var product=new Productos(null,datos);
    var error=1;
    if (product.bandera==0){
        try{
            console.log(product.obtenerDatosProducto());
            await conexion.doc().set(product.obtenerDatosProducto());
            console.log("Producto insertado a la BD");
            error=0;
        }
        catch(err){
            console.log("Error al capturar el nuevo producto"+err);
        }   
    }
    return error;
}

async function modificarProducto(datos){
    var error=1;
    var resBuscar=await buscarPorID(datos.id);
    if (resBuscar!=undefined) {
        var product=new Productos(datos.id,datos);   
        if (product.bandera==0){
            try{
                await conexion.doc(product.id).set(product.obtenerDatosProducto());
                console.log("Registro actualizado");
                error=0;
            }
            catch(err){
                console.log("Error al modificar el producto"+err);
            }
        }
    }
    return error;
}

async function borrarProducto(id){
    var error=1;
    var product= await buscarPorID(id);
    if (product!=undefined) {
        try{
            await conexion.doc(id).delete();
            console.log("Registro borrado");
        }
        catch(err){
            console.log("Error al borrar el producto"+err);
        }
    }
    return error;
}





module.exports={
    mostrarProductos,
    buscarPorID,
    nuevoProducto,
    modificarProducto,
    borrarProducto
}