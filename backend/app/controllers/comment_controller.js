const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const Comment = mongoose.model('Comment');
const User = mongoose.model('User');
const FormatError = require('../utils/responseApi.js').FormatError;
const FormatSuccess = require('../utils/responseApi.js').FormatSuccess;

async function get_param(req, res, next, slug_comment) {
    try {
        const product = await Product.findOne({ slug: slug_comment });
        if (!product) {
            return res.status(404).json(FormatError("No product found", res.statusCode));
        }
        req.product = product;
        return next();
    } catch (error) {
        res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }//try catch
}//get_param

async function get_comment(req, res) {
    try {
        const product = req.product;
        const get_product = await product.populate({ path: 'comments', populate: { path: 'owner' } });
        res.json(get_product.comments.map(c => c.toJSONFor()));
    } catch (error) {
        res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }
}//get_comment

async function add_comment(req, res) {
    try {
        const user = await User.findOne({ id: req.auth.id });
        if (!user) {
            return res.status(404).json(FormatError("No profile found", res.statusCode));
        }
        if (!req.body.msg || req.body.msg.replace(/\s/g, "").length == 0) {
            return res.status(404).json(FormatError("No msg found", res.statusCode));
        }
        const data = {
            msg: req.body.msg,
            owner: user._id,
            product: req.product._id
        }
        const comment = new Comment(data);
        await comment.save();
        const comment_populate = await comment.populate({ path: 'owner' });
        await Product.findOneAndUpdate({ slug: req.product.slug },
            { $push: { comments: comment._id } });
        res.json(FormatSuccess('Comment added', comment_populate.toJSONFor()));
    } catch (error) {
        console.error(error);
        res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }
}//add_comment

async function delete_comment(req, res) {
    try {
        const id = req.params.id;
        const user = await User.findOne({ id: req.auth.id });
        if (!user) {
            res.status(404).json(FormatError("No profile found", res.statusCode));
        }
        const comment = await Comment.findById(id);
        if (String(comment.owner) === String(user._id)) {
            await Comment.findByIdAndDelete(id);
            res.json(FormatSuccess('Comment deleted'));
        } else {
            res.status(401).json(FormatError("No permision", res.statusCode));
        }

    } catch (error) {
        res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }
}//delete_comment

const comment_constroller = {
    add_comment: add_comment,
    delete_comment: delete_comment,
    get_comment: get_comment,
    get_param: get_param,
}

module.exports = comment_constroller;