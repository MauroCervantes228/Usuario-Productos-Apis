var admin=require("firebase-admin");
var keys=require("../Keys.json");

admin.initializeApp({
    credential:admin.credential.cert(keys)
});
var micuenta=admin.firestore();
var conexionUsuarios=micuenta.collection("DuneBD");
var conexionProductos=micuenta.collection("ProductoBD");

module.exports={
    conexionUsuarios,
    conexionProductos
}