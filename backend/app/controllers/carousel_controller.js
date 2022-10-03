const mongoose = require('mongoose');
const Category = mongoose.model('Category');
const FormatError = require('../utils/responseApi.js').FormatError;

async function getCarousel_category(req, res) {
    try {
        const category = await Category.find();
        res.json(category.map(c => c.toJSONcarusel()));
    } catch (error) {
        res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }//end trycath
}//getall_category


const carousel_controller = {
    getCarousel_category: getCarousel_category
}

module.exports = carousel_controller;