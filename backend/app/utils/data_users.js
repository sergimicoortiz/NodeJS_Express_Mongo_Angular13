const faker = require('@faker-js/faker/locale/en').faker;
const pic_resolution = [400, 400];

const users = [{
    username: "a",
    email: "a@gmail.com",
    password: "a",
    image: faker.image.cats(pic_resolution[0], pic_resolution[1], true)
},
{
    username: "b",
    email: "b@gmail.com",
    password: "b",
    image: faker.image.cats(pic_resolution[0], pic_resolution[1], true)
},
{
    username: "c",
    email: "c@gmail.com",
    password: "c",
    image: faker.image.cats(pic_resolution[0], pic_resolution[1], true)
}];

module.exports = users;