//import { Archivo } from './Archivo.js';

const express = require('express');
const handlebars = require('express-handlebars');
const { insertDocuments, readDocuments } = require('./Controllers/functionsCRUD-Mongo.js');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const objProductos = [];
const objMensajes = [];

app.use(express.static('./public'));

app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutsDir: "./views/layouts",
        partialsDir: "./views/partials"
    })
);
    
app.set('views', './views'); // especifica el directorio de vistas
app.set('view engine', 'hbs'); // registra el motor de plantillas

http.listen(3030, async () => {
    

    let productosMongo = await readDocuments('producto');
    productosMongo.forEach(prod => {
        objProductos.push(prod);
    });

    let mensajesMongo = await readDocuments('mensajes');
    mensajesMongo.forEach(mens => {
        objMensajes.push(mens);
    });

    console.log('escuchando desde servidor. Puerto: 3030')} )


io.on ('connection', async (socket) => {
    console.log('Usuario conectado');

    socket.emit('productCatalog', { products: objProductos});
    socket.on('newProduct', async (data) => {
        insertDocuments(data,'producto');
        objProductos.push(data);
        io.sockets.emit('productCatalog', { products: objProductos});
    });

    socket.emit('mensajes', objMensajes);
    socket.on('nuevo-mensaje', async (data)=>{
        insertDocuments(data,'mensaje');
        objMensajes.push(data);
        io.sockets.emit('mensajes', objMensajes);
    });

});

app.get('/', async (req,res)=>{
    res.render('products', { products: objProductos })
});