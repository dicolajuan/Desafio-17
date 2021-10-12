const {options} = require('./optionsDB');
const knex = require('knex')(options);

const listarProductos = async () => {
    try{
        let products = await knex.from('products').select('*');
        console.log('Listando productos...');
        // for (let prod of products) {
        //     console.log(`Id Producto: ${prod['id']}. Precio: $${prod['price']} - URL: ${prod['thumbnail']}`);
        // }
        knex.destroy();
        return products;
    }catch(e) {
        console.log('Error en proceso:', e);
        knex.destroy();
    }
};

const producto = {
    title: 'Camara Web Trust Taxon Qhd 1440p',
    price: 9399,
    thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_940760-MLA46980955394_082021-O.webp'
  };
const insertarProducto = async (producto) => {
    //console.log(producto);
    // try{
    //     await knex('products').insert(producto);
    // } catch (e){
    //     console.log('error en proceso:', e);
    // }
    // finally {
    //     console.log('INSERT finalizado!');
    //     knex.destroy();
    // }
    knex('products').insert(producto)
    .then (()=>{
        console.log('Fila insertada!');
        knex.destroy();
    })
    .catch(e=>{
        console.log('Error en Insert:', e);
        knex.destroy();
    })
}

const lastRow = async () => {
    let prod = await knex.select('*').from('products').orderByRaw('id DESC');
    knex.destroy();
    return prod[0];
}

const deleteProd = async (id) => {
    // await knex('products').where('id', '>' , id).del();
    knex('products').where('id', '>' , id).del()
    .then(() => {
        console.log('Filas borradas!');
        knex.destroy();
    })
    .catch(e=>{
        console.log('Error en Delete:', e);
        knex.destroy();
    });
    
}


module.exports = {
    listarProductos,
    insertarProducto,
    lastRow,
    deleteProd
}