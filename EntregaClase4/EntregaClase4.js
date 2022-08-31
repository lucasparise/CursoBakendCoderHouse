const fs = require("fs");

class Contenedor {

    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
        fs.promises.writeFile(this.nombreArchivo,JSON.stringify([],null,2));
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
        return productoAGuardar.id;
        }
        catch (error){
            throw new Error(error);
        }
    }

    /* metodo buscador por id */
    async getByID(id){
        try{
            let productosGuardados = await this.getAll();
            let datosProductos = Array.from(productosGuardados);
            return datosProductos.find(i => i.id === id);
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

    /* metodo borrar por ID */
    async deleteByID(id){
        try{
            let productosGuardados = await this.getAll();
            let datosProductos = Array.from(productosGuardados);
            datosProductos = [...datosProductos.filter(i => i.id !== id)];
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(datosProductos,null,2)) ;
            console.log("Producto eliminado")
        }
        catch (error){
            throw new Error(error);
        }
    }

    /* metodo borrar todo */
    async deleteAll(id){
        try{
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([],null,2));
            console.log("se elimino todo")
        }
        catch (error){
            throw new Error(error);
        }
    }
}


async function test(){
    try{
        const listaProductos = new Contenedor("productos.txt");

        /* test guardar productos */
        let item1 = await listaProductos.save({
            title: "Last of Us",
            price: 60,
            img:"https://images5.alphacoders.com/394/394511.jpg"
        })

        let item2 = await listaProductos.save({
            title: "Mass Effect",
            price: 30,
            img:"https://images6.alphacoders.com/309/309815.jpg"
        })

        let item3 = await listaProductos.save({
            title: "Dead Space",
            price: 25,
            img:"https://images.alphacoders.com/250/250383.jpg"
        })
        

        /* test buscar por ID */
        let buscarProd = await listaProductos.getByID(3);
        console.log(buscarProd)

        let buscarProdinx = await listaProductos.getByID(10);
        console.log(buscarProdinx)

        /* test traer todos */
        let buscarAll = await listaProductos.getAll();
        console.log(buscarAll)


        /* test borrar por ID */
        await listaProductos.deleteByID(2);
        console.log(await listaProductos.getAll());

        /* test borrar todos */
        await listaProductos.deleteAll();
        console.log(await listaProductos.getAll());
    
    }catch (error){
            console.log(error);
    }
}

test();