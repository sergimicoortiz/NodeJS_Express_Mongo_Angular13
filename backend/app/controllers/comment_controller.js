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
        /* let user_auth = null;
        if (req.auth) {
            user_auth = await User.findOne({ id: req.auth.id });
        } */
        const product = req.product;
        //const get_product = await product.populate({ path: 'comments', populate: { path: 'owner' } });
        //res.json(get_product.comments.map(c => c.toJSONFor(user_auth)));
        const get_product = await product.populate({ path: 'comments', populate: { path: 'owner' } });
        res.json(get_product.comments.map(c => c.toJSONFor()));
    } catch (error) {
        console.log(error);
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
        const save = await comment.save();
        const save_product = await Product.findOneAndUpdate({ slug: req.product.slug },
            { $push: { comments: comment._id } });
        res.json(FormatSuccess('Comment added'));
    } catch (error) {
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
            const comment_delete = await Comment.findByIdAndDelete(id);
            res.json(FormatSuccess('Comment deleted'));
        } else {
            res.status(401).json(FormatError("No permision", res.statusCode));
        }

    } catch (error) {
        res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }
}//delete_comment

async function update_comment(req, res) {
    const user = await User.findOne({ id: req.auth.id });
    if (!user) {
        return res.status(404).json(FormatError("No profile found", res.statusCode));
    }
    if (!req.body.msg || req.body.msg.replace(/\s/g, "").length == 0) {
        return res.status(404).json(FormatError("No msg found", res.statusCode));
    }
}//update_comment

const comment_constroller = {
    add_comment: add_comment,
    delete_comment: delete_comment,
    get_comment: get_comment,
    get_param: get_param,
    update_comment: update_comment

}

module.exports = comment_constroller;