const express = require('express');
const routerProducto = express.Router();
const {Contenedor} = require("./container");

const contenedor = new Contenedor("productos.txt")

/* ver todos los productos */   
routerProducto.get("/", async(req, res) => {
    const listaProductos = await contenedor.getAll();
    res.render("layouts/index", {
		productos: listaProductos,
		hayProductos: listaProductos.length,
	});
})


/* ver producto por ID */  
routerProducto.get("/:id", async(req, res) => {
    const productobuscado = await contenedor.getByID(req.params.id);
    res.json(productobuscado ?? {error: "producto no encontrado"});
})


/* agregar producto */
routerProducto.post("/", async (req, res) => {
    let datos = req.body;
    const producto = await contenedor.save(datos);
    res.redirect("/public");
})


/* actualizar producto */
routerProducto.put("/:id", async(req, res) => {
    console.log(req.body.title)
    let datos = req.body
    const producto = await contenedor.updateByID(datos, req.params.id);
    res.json(producto);
})


/* borrar producto por ID */
routerProducto.delete("/:id", async(req, res) => {
    const resultado = await contenedor.deleteByID(req.params.id);
    res.json(`Se elimino producto con el id: ${resultado}`);
})



module.exports = {routerProducto}