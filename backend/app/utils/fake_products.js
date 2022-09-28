const faker = require('@faker-js/faker/locale/en').faker;
const categorys = require('./data_categorys.js');
const pic_resolution = [400, 400];

function fake_comments(n) {
    let comments = [];
    for (let i = 0; i < n; i++) {
        const comment = {
            owner: faker.name.firstName(),
            msg: faker.lorem.paragraph(1),
            likes: parseInt(faker.commerce.price(10, 300)),
            date: new Date()
        };
        comments.push(comment);
    }//end for
    return comments;
}//fake_comments

function fake_products(n, c) {
    let products = [];
    for (let i = 0; i < n; i++) {
        const min = 0;
        const max = categorys.length - 1;
        const index = Math.floor(Math.random() * (max - min) + min);
        const product = {
            name: faker.commerce.product(),
            price: parseInt(faker.commerce.price(10, 300)),
            description: faker.lorem.paragraph(1),
            owner: faker.name.firstName(),
            picture: [faker.image.cats(pic_resolution[0], pic_resolution[1], true), faker.image.cats(pic_resolution[0], pic_resolution[1], true), faker.image.cats(pic_resolution[0], pic_resolution[1], true)],
            likes: parseInt(faker.commerce.price(10, 300)),
            date: new Date(),
            comments: fake_comments(c)
        };
        products.push(product);
    }//for

    return products;
}

module.exports = fake_products;