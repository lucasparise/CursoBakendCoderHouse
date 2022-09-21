const fs = require("fs");
const {routerProducto} = require("./routerProducto")

const handlebars = require("express-handlebars");
const express = require('express');

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.engine(
	"hbs",
	handlebars({
		extname: ".hbs",
		defaultLayout: "index.hbs",
	})
);
app.set("view engine", "hbs");
app.set("views", "./views");


const PORT = process.env.PORT || 8080
const server = app.listen(PORT,()=> {
    console.log("servidor levantado en el puerto " + server.address().port);
})

app.get("/", (req, res) =>{
    res.send("servidor levantado")
})
app.use("/public", express.static("public"));
app.use("/api/productos", routerProducto);