const faker = require('@faker-js/faker/locale/en').faker;
const categorys = require('./data_categorys.js');

function fake_products(n) {
    let products = [];
    for (let i = 0; i < n; i++) {
        const min = 0;
        const max = categorys.length - 1;
        const index = Math.floor(Math.random() * (max - min) + min);
        const product = {
            name: faker.commerce.product(),
            price: parseInt(faker.commerce.price(10, 300)),
            description: faker.lorem.paragraph(),
            owner: faker.name.firstName(),
            category: categorys[index].category_name,
            picture: ['pic1', 'pic2', 'pic3']
        };
        products.push(product);
    }//for

    return products;
}

module.exports = fake_products;