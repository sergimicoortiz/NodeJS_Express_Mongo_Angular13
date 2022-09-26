"use strict";

require('dotenv').config();
const mongoose = require('mongoose');
const connectdb = require("../config/config_db.js");
const fake_products = require("./fake_products.js");

const categorys = require('./data_categorys.js');

async function main() {
    try {
        await connectdb(process.env.MONGO_URI)
        require('../models/category_model.js');
        require("../models/product_model.js");
        const Category = mongoose.model('Category');
        const Product = mongoose.model('Product');
        const products = fake_products(process.env.DUMMY_PRODUCTS || 10);
        await Product.collection.drop();
        await Category.collection.drop();
        categorys.forEach(async (e) => {
            const new_category = new Category(e);
            await new_category.save();
            console.log(`Category ${e.category_name} added`);
        });//end foreach
        products.forEach(async (e) => {
            const new_product = new Product(e);
            await new_product.save();
            console.log(`Product ${e.name} added`);
        });//end foreach
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}//main

main();