"use strict";

require('dotenv').config();
const mongoose = require('mongoose');
const connectdb = require("../config/config_db.js");
const fake_products = require("./fake_products.js");
const categorys = require('./data_categorys.js');

async function main() {
    try {
        await connectdb(process.env.MONGO_URI);
        require('../models/category_model.js');
        require("../models/product_model.js");
        const Category = mongoose.model('Category');
        const Product = mongoose.model('Product');
        await Category.collection.drop();
        await Product.collection.drop();
        for (let c = 0; c < categorys.length; c++) {
            const products = fake_products(process.env.DUMMY_PRODUCTS || 5, process.env.DUMMY_COMMENTS || 5);
            let products_id = [];
            for (let p = 0; p < products.length; p++) {
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