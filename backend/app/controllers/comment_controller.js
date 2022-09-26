const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const FormatError = require('../utils/responseApi.js').FormatError;
const FormatSuccess = require('../utils/responseApi.js').FormatSuccess;

async function add_comment(req, res) {
    try {
        const id = req.params.id;
        const comment_data = {
            //id: 'a',
            owner: req.body.owner || null,
            date: new Date(),
            likes: 0,
            msg: req.body.msg || null
        }
        const product = await Product.updateOne({ slug: id }, {
            $push: {
                comments: comment_data
            }
        });
        if (product.modifiedCount !== 0) {
            res.json(FormatSuccess('comment added'));
        } else {
            res.status(404).json(FormatError("The product or the category don't exist", res.statusCode));
        }
    } catch (error) {
        if (error.kind === 'ObjectId') { res.status(404).json(FormatError("Product not found", res.statusCode)); }
        else { res.status(500).json(FormatError("An error has ocurred", res.statusCode)); }
    }
}//add_comment

async function delete_comment(req, res) {
    try {
        const id = req.params.id;
        const comment_id = req.params.comment_id;
        const product = await Product.updateOne({ slug: id },
            {
                $pull: {
                    comments: { _id: comment_id }
                }
            }
        );
        if (product.modifiedCount !== 0) {
            res.json(FormatSuccess('comment deleted'));
        } else {
            res.status(404).json(FormatError("The product or the category don't exist", res.statusCode));
        }
    } catch (error) {
        if (error.kind === 'ObjectId') { res.status(404).json(FormatError("Product not found", res.statusCode)); }
        else { res.status(500).json(FormatError("An error has ocurred", res.statusCode)); }
    }
}//delete_comment

const comment_constroller = {
    add_comment: add_comment,
    delete_comment: delete_comment
}

module.exports = comment_constroller;