"use strict";

require('dotenv').config();
const mongoose = require('mongoose');
const connectdb = require("../config/config_db.js");
const fake_products = require("./fake_products.js");
const categorys = require('./data_categorys.js');
const users = require('./data_users.js');

async function main() {
    try {
        await connectdb(process.env.MONGO_URI);
        require('../models/category_model.js');
        require("../models/product_model.js");
        require("../models/user_module.js");
        const Category = mongoose.model('Category');
        const Product = mongoose.model('Product');
        const User = mongoose.model('User');
        await Category.collection.drop();
        await Product.collection.drop();

        let users_id = await User.find();
        users_id = users_id.map(i => i._id.toString());
        for (let c = 0; c < categorys.length; c++) {
            const products = fake_products(process.env.DUMMY_PRODUCTS || 5, users_id);
            let products_id = [];
            for (let p = 0; p < products.length; p++) {
                products[p].category = categorys[c].category_name;
                const new_product = new Product(products[p]);
                const save = await new_product.save();
                products_id.push(String(save._id));
            }//for products
            categorys[c]['category_products'] = products_id;
            const new_category = new Category(categorys[c]);
            await new_category.save();
            console.log(`Category ${categorys[c].category_name} and his products added. `)
        }//for categorys
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}//main

main();