const {options} = require('../Database/SQLite3');
const knex = require('knex')(options);

const iniciarTabla = async () => {
    if(! await knex.schema.hasTable('mensajes')) {
        await knex.schema.createTable('mensajes', table => {
            table.increments('id'),
            table.string('autor'),
            table.string('fecha'),
            table.string('texto')
        });
        }else{
            console.log('La tabla mensajes ya existe ✔');
        }
    };

iniciarTabla();

const listarMensajes = async () => {
    try{
        let mensajes = await knex.from('mensajes').select('*');
        return mensajes;
    }catch(e) {
        console.log('Error en proceso:', e);
    }
};

const lastRowMessage = async () => {
    let mens = await knex.select('*').from('mensajes').orderByRaw('id DESC');
    return mens[0];
}

const insertarMensaje = async (mensaje) => {
    await knex('mensajes').insert(mensaje);
}

module.exports = {
    listarMensajes,
    insertarMensaje,
    lastRowMessage
}