const faker = require('@faker-js/faker/locale/en').faker;
const categorys = require('./data_categorys.js');
const pic_resolution = [400, 400];

function randomNumber(max, min = 0) {
    return Math.floor(Math.random() * (max - min) + min);
}

function fake_products(n, users_id) {
    let products = [];
    const max = users_id.length - 1;
    for (let i = 0; i < n; i++) {
        const min = 0;
        const max = categorys.length - 1;
        const index = Math.floor(Math.random() * (max - min) + min);
        const product = {
            name: faker.commerce.product(),
            price: parseInt(faker.commerce.price(10, 300)),
            description: faker.lorem.paragraph(1),
            owner: users_id[randomNumber(max)],
            picture: [faker.image.cats(pic_resolution[0], pic_resolution[1], true), faker.image.cats(pic_resolution[0], pic_resolution[1], true), faker.image.cats(pic_resolution[0], pic_resolution[1], true)],
            likes: parseInt(faker.commerce.price(10, 300)),
            date: new Date(),
        };
        products.push(product);
    }//for

    return products;
}

module.exports = fake_products;