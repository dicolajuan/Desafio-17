const options = {
    client: 'sqlite3',
    connection: {
        filename: './mensajes.sqlite'
    },
    useNullAsDefault: true
}

console.log('Conectando a la base de datos...');

module.exports = {
    options
}