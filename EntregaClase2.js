class Usuario {
    constructor (nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        return `El nombre es ${this.nombre} ${this.apellido}`;
    }

    addMascota(nuevaMascota){
        this.mascotas.push(nuevaMascota);
    }

    countMascotas(){
        return this.mascotas.length
    }

    addBook(nombreLibro, autorLibro){
        this.libros.push({nombreLibro: nombreLibro, autorLibro: autorLibro})
    }

    getBookNames(){
        return this.libros.map(i => i.nombreLibro);
    }

}

/* creacion de un usuario */

const User1 = new Usuario(
    'Pepe',
    'Ramirez',
    [{nombreLibro:'Ficciones', autorLibro:'Borges'}],
    ['perro']
)

/* prueba nombre completo */
console.log(User1.getFullName());


/* prueba mascotas */
console.log(User1.countMascotas());
User1.addMascota('loro');
console.log(User1.countMascotas());


/* prueba libros */
console.log(User1.getBookNames());
User1.addBook('Don Quijote', 'Cervantes');
console.log(User1.getBookNames());
