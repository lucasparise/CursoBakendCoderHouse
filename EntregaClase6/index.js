const fs = require("fs");

const express = require('express');
const app = express()
const PORT = process.env.PORT || 8080

const server = app.listen(PORT,()=> {
    console.log('servidor levantado')
})


class Contenedor {

    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
    }

    /* metodo mostrar producto random */
    async productoRandom(){
        try{
            let productosGuardados = await this.getAll();
            let datosProductos = Array.from(productosGuardados);
            let idRandom = Math.floor(Math.random() * (datosProductos.length - 1 + 1) + 1);
            return datosProductos.find(i => i.id === idRandom);
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
}


const listaProductos = new Contenedor("productos.txt")


app.get("/productos", async (req, res) => {
    let productos = await listaProductos.getAll();
    res.send(productos)
})

app.get("/productoRandom", async (req, res) => {
    let productoRandom = await listaProductos.productoRandom();
    res.send(productoRandom)
})