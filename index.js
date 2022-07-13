const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 8080;

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(this.archivo);
            const objeto = JSON.parse(data);
            return objeto;
        } catch(err) {
            throw new Error(err);
        }
    }

    async getRandom() {
        try {
            const data = await fs.promises.readFile(this.archivo);
            const objeto = JSON.parse(data);
            const random = Math.floor(Math.random() * objeto.length);
            return objeto[random];
        } catch(err) {
            throw new Error(err)
        }
    }
}

let contenedor = new Contenedor('./productos.txt');

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`)
 });
server.on("error", error => console.log(`Error en servidor ${error}`));
app.get('/', (req, res) => {
    res.send('<h1 style="color:red;">Bienvenido al servidor Express!</h1><h2><a href="/productos">Ver Productos</a></h2><h2><a href="/productoRandom">Un Producto Random</a></h2>')
});

app.get('/productos', (req, res) => {
    contenedor.getAll().then(data => {
        res.send(`<h1 style="color:red;">Bienvenido al servidor Express!</h1><h2><a href="/">Volver</a></h2><h2><a href="/productoRandom">Un Producto Random</a></h2><h1 style="color:green;">Todos los productos:</h1><div style="display:flex; flex-direction: column; justify-content:center; align-items: center">${JSON.stringify(data[0])}</div></br><div style="display:flex; flex-direction: column; justify-content:center; align-items: center">${JSON.stringify(data[1])}</div></br><div style="display:flex; flex-direction: column; justify-content:center; align-items: center">${JSON.stringify(data[2])}</div>`);
    }).catch(err => {
        res.send(err);
    })
});

app.get('/productoRandom', (req, res) => {
    contenedor.getRandom().then(data => {
        res.send(`<h1 style="color:red;">Bienvenido al servidor Express!</h1><h2><a href="/productos">Ver Productos</a></h2><h2><a href="/">Volver</a></h2><h1 style="color:green;">Un producto random? Aqui esta:</h2><div style="display:flex; flex-direction: column; justify-content:center; align-items: center">${JSON.stringify(data)}</div>`)
    }).catch(err => {
        res.send(err);
    })
});