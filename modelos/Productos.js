class Producto{
    constructor(id, data){
        this.bandera=0;
        this.id=id;
        this.producto=data.producto;
        this.precio=data.precio;
        this.stock=data.stock;
        this.foto=data.foto;
    }
    set id(id){
        if(id!=null)
            id.length>0?this._id=id:this.bandera=1; 
    }
    set producto(producto){
        producto.length>0?this._producto=producto:this.bandera=1;
    }
    set stock(stock){
        stock>0?this._stock=stock:this.bandera=1;
    }
    set precio(precio){
        precio>0?this._precio=precio:this.bandera=1;
    }

    set foto(foto){
        foto.length>0?this._foto=foto:this.bandera=1;
    }

    get id(){
        return this._id;
    }
    get producto(){
        return this._producto;
    }
    get stock(){
        return this._stock;
    }
    get precio(){
        return this._precio;
    }

    get foto(){
        return this._foto;
    }

    obtenerDatosProducto(){
        if(this._id!=null)
            return {
                id:this.id,
                producto:this.producto,
                precio:this.precio,
                stock:this.stock,
                foto:this.foto
            }
        else{
            return {
                producto:this.producto,
                precio:this.precio,
                stock:this.stock,
                foto:this.foto
            }
        }    
    }
}
module.exports=Producto;