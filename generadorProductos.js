const faker = require('faker');

faker.locale = 'es';

const getProduct = () => ({
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    thumbnail: faker.image.avatar()
});

const generarProductos = (cantidad) => {
    let objProductos = [];
    let cant = cantidad || 10;
    for(let i=0;i < cant;i++){
        let product = getProduct();
        objProductos.push(product);
    };
    console.log(objProductos);
    return objProductos;
}

module.exports = {
    getProduct,
    generarProductos
}