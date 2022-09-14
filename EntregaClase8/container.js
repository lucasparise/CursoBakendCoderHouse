const fs = require("fs");


class Contenedor {

    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
    }

    /* metodo de guardado de producto */
    async save(productoAGuardar){
        try{
            let productosGuardados = await this.getAll();
            let datosProductos = Array.from(productosGuardados);
        
        if(datosProductos.length > 0){
            productoAGuardar.id = (datosProductos[datosProductos.length-1].id +1);
        }else{
            productoAGuardar.id = 1;
        }
        datosProductos.push(productoAGuardar);
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(datosProductos,null,2));
        console.log(`Se guardo el producto`);
        return productoAGuardar;
        }
        catch (error){
            throw new Error(error);
        }
    }

    /* metodo traer todo */
    async getAll(){
        try{
            let productosGuardados = await fs.promises.readFile(this.nombreArchivo);
            return JSON.parse(productosGuardados);
        }
        catch (error){
            throw new Error(error);
        }
    }

    /* metodo buscador por id */
    async getByID(id){
        try{
            let productosGuardados = await this.getAll();
            let productoEncontrado = productosGuardados.find(i => i.id === parseInt(id));
            return productoEncontrado
        }
        catch (error){
            throw new Error(error);
        }
    }

    /* metodo para actualizar producto por ID */
    async updateByID(productoAActualizar, id){
        try{
            let productosGuardados = await this.getAll();
            let datosProductos = Array.from(productosGuardados);

            let index = datosProductos.findIndex(i => i.id ===  parseInt(id));

            if (index != -1){
                datosProductos[index] = {...productoAActualizar, id};
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(datosProductos,null,2));
                return {...productoAActualizar, id}
            }else{
                console.log('no se encontro ID');
                return null
            }
        }
        catch (error){
            throw new Error(error);
        }
    }

    /* metodo borrar por ID */
    async deleteByID(id){
        try{
            let productosGuardados = await this.getAll();
            let datosProductos = Array.from(productosGuardados);
            datosProductos = [...datosProductos.filter(i => i.id !== parseInt(id))];
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(datosProductos,null,2)) ;
            return id;
        }
        catch (error){
            throw new Error(error);
        }
    }
}

module.exports = {Contenedor};