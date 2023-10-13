var express=require("express");
var cors=require("cors");
var path=require("path");//no es necesario instalarlo
var rutasUsuarios=require("./rutas/usuariosRutas");
var rutasProducto=require("./rutas/productosRutas");
var rutasUsuariosApis=require("./rutas/usuariosRutasApis");
var rutasProductosApis=require("./rutas/productosRutasApis")


var app=express();
app.set("view engine", "ejs");
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use("/",express.static(path.join(__dirname,"/web")));
app.use("/",rutasUsuarios);
app.use("/",rutasProducto);
app.use("/",rutasUsuariosApis);//api es para que otra aplicación se conecte a la mía
app.use("/",rutasProductosApis);

var port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("Servidor en http://localhost:"+port);
});  