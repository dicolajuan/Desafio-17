const {options} = require('./optionsDB');
const knex = require('knex')(options);

const listarProductos = async () => {
    try{
        let products = await knex.from('products').select('*');
        return products;
    }catch(e) {
        console.log('Error en proceso:', e);
    }
};

const insertarProducto = async (producto) => {
    //console.log(producto);
    await knex('products').insert(producto);
}

const lastRow = async () => {
    let prod = await knex.select('*').from('products').orderByRaw('id DESC');
    return prod[0];
}

const deleteProd = async (id) => {
    await knex('products').where('id', '>' , id).del();
}


module.exports = {
    listarProductos,
    insertarProducto,
    lastRow,
    deleteProd
}