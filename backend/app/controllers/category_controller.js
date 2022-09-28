const mongoose = require('mongoose');
const Category = mongoose.model('Category');
const FormatError = require('../utils/responseApi.js').FormatError;
const FormatSuccess = require('../utils/responseApi.js').FormatSuccess;

async function getall_category(req, res) {
    try {
        const category = await Category.find().populate('category_products');
        res.json(category);
    } catch (error) {
        res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }//end trycath
}//getall_category

async function getone_category(req, res) {
    try {
        const id = req.params.id
        //const category = await Category.findOne({ slug: id }).populate({ path: 'category_products', options: { limit: 2, skip: 2 } });
        const category = await Category.findOne({ slug: id }).populate('category_products');
        if (!category) {
            res.status(404).json(FormatError("Category not found", res.statusCode));
        } else {
            res.json(category);
        };
    } catch (error) {
        if (error.kind === 'ObjectId') { res.status(404).json(FormatError("Category not found", res.statusCode)); }
        else { res.status(500).json(FormatError("An error has ocurred", res.statusCode)); }
    }
};

async function create_category(req, res) {
    try {
        const category_data = {
            category_name: req.body.category_name || null,
            category_picture: req.body.category_picture || null,
            category_products: []
        };
        const category = new Category(category_data);
        await category.save();
        res.json(FormatSuccess('Category added', category_data));
    } catch (error) {
        res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }//end try cath
}//create_category

async function delete_category(req, res) {
    try {
        const id = req.params.id
        const category = await Category.findOneAndDelete({ slug: id });
        if (!category) { res.status(404).json(FormatError("Category not found", res.statusCode)) } else {
            res.json(FormatSuccess("Category deleted"));
        }
    } catch (error) {
        if (error.kind === 'ObjectId') { res.status(404).json(FormatError("Category not found", res.statusCode)); }
        else { res.status(500).json(FormatError("An error has ocurred", res.statusCode)); }
    }//end try catch
}

async function update_category(req, res) {
    try {
        const id = req.params.id
        const old_category = await Category.findOne({ slug: id });
        if (old_category.category_name !== req.body.category_name && req.body.category_name !== undefined) {
            old_category.slug = null;
        }//end if
        old_category.category_name = req.body.category_name || old_category.category_name;
        old_category.category_picture = req.body.category_picture || old_category.category_picture;
        old_category.category_products = req.body.category_products || old_category.category_products;
        const category = await old_category.save();
        if (!category) { res.status(404).json(FormatError("Category not found", res.statusCode)); } else {
            res.json({ msg: "Category updated" })
        }
    } catch (error) {
        if (error.kind === 'ObjectId') { res.status(404).json(FormatError("Category not found", res.statusCode)); }
        else { res.status(500).json(FormatError("An error has ocurred", res.statusCode)); }
    }//end try catch
}

async function deleteAll_category(req, res) {
    try {
        const category = await Category.collection.drop();
        res.json(FormatSuccess('Category colection deleted'));
    } catch (error) {
        if (error.code === 26) { res.status(404).json(FormatError("Category colection not exist", res.statusCode)); }
        else { res.status(500).json(FormatError("An error has ocurred", res.statusCode)); }
    }//end try catch
}

async function getCarousel_category(req, res) {
    try {
        const category = await Category.find();
        res.json(category.map(c => c.toJSONcarusel()));
    } catch (error) {
        res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }//end trycath
}//getall_category


const category_controller = {
    getall_category: getall_category,
    getone_category: getone_category,
    create_category: create_category,
    delete_category: delete_category,
    update_category: update_category,
    deleteAll_category: deleteAll_category,
    getCarousel_category: getCarousel_category
}

module.exports = category_controller;