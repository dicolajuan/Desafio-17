//import { Archivo } from './Archivo.js';

const express = require('express');
const handlebars = require('express-handlebars');
const { insertDocuments, readDocuments } = require('./Controllers/functionsCRUD-Mongo.js');
const { getProduct, generarProductos } = require('./generadorProductos.js');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const objProductos = [];
const objMensajes = [];
const objProductosFaker = [];

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
    

    // let productosMongo = await readDocuments('producto');
    // productosMongo.forEach(prod => {
    //     objProductos.push(prod);
    // });

    // for(let i=0;i < 10;i++){
    //     objProductos.push(getProduct());
    // };

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

app.get('/:cant?', async (req,res)=>{
    let cant = req.query.cant || 10;
    for(let i=0;i < cant;i++){
        objProductos.push(getProduct());
    };
    res.render('products-Faker', { products: objProductos })
});

app.get('/productos/:cant', async (req,res)=>{
    //const {cant} = req.params;
    for(let i=0;i < req.params.cant;i++){
        objProductos.push(getProduct());
    };
    //console.log(objProductosFaker);
    res.render('products-Faker', { products: objProductos });
});