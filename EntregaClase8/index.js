const fs = require("fs");
const {routerProducto} = require("./routerProducto")
const express = require('express');
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 8080
const server = app.listen(PORT,()=> {
    console.log("servidor levantado en el puerto " + server.address().port);
})

app.use("/public", express.static("public"));

app.use("/api/productos", routerProducto);