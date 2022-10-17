const mongoose = require('mongoose');
const Category = mongoose.model('Category');
const FormatError = require('../utils/responseApi.js').FormatError;
const FormatSuccess = require('../utils/responseApi.js').FormatSuccess;

async function getall_category(req, res) {
    try {
        const category = await Category.find();
        res.json(category.map(item => item.toJSONfilters()));
    } catch (error) {
        res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }//end trycath
}//getall_category


const category_controller = {
    getall_category: getall_category
}

module.exports = category_controller;