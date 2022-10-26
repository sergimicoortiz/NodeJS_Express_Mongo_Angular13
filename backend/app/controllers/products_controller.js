const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const User = mongoose.model('User');
const Category = mongoose.model('Category');
const FormatError = require('../utils/responseApi.js').FormatError;
const FormatSuccess = require('../utils/responseApi.js').FormatSuccess;

const CalculatePagination = (page, size) => {
    if (page <= 0) {
        page = 1;
    }
    if (size <= 0) {
        size = 1
    }
    return {
        limit: size,
        offset: size * (page - 1)
    }
}//CalculatePaginate

async function getall_products(req, res) {
    try {
        const page = parseInt(req.query.page);
        const size = parseInt(req.query.size);
        const category_slug = req.params.category;
        let options = CalculatePagination(page || 1, size || 9);
        let search = {};
        let minPrice = req.query.minPrice;
        let maxPrice = req.query.maxPrice;
        let sort = {};
        if (req.query.name) {
            search.name = { $regex: new RegExp(req.query.name) };
        }
        if (req.query.owner) {
            search.owner = { $regex: new RegExp(req.query.owner) };
        }

        //Search min and max price
        if (req.query.minPrice && req.query.maxPrice) {
            search.$and = [{ price: { $gte: minPrice } }, { price: { $lte: maxPrice } }];
        } else if (req.query.minPrice && req.query.maxPrice == undefined) {
            search.$and = [{ price: { $gte: minPrice } }];
        } else if (req.query.minPrice == undefined && req.query.maxPrice) {
            search.$and = [{ price: { $lte: maxPrice } }];
        }

        //Order by price and likes
        if (req.query.price_order == 1 && req.query.likes_order == 1) {
            sort = { "price": -1, "likes": -1 }
        } else if (req.query.price_order == 2 && req.query.likes_order == 1) {
            sort = { "price": 1, "likes": -1 }
        } else if (req.query.price_order == 1 && req.query.likes_order == 2) {
            sort = { "price": -1, "likes": 1 }
        } else if (req.query.price_order == 2 && req.query.likes_order == 2) {
            sort = { "price": 1, "likes": 1 }
        } else if (req.query.price_order == 1 && req.query.likes_order == undefined) {
            sort = { "price": -1 }
        } else if (req.query.price_order == 2 && req.query.likes_order == undefined) {
            sort = { "price": 1 }
        } else if (req.query.price_order == undefined && req.query.likes_order == 1) {
            sort = { "likes": -1 }
        } else if (req.query.price_order == undefined && req.query.likes_order == 2) {
            sort = { "likes": 1 }
        }

        let products = {};

        if (category_slug) {
            options = { limit: options.limit, skip: options.offset, sort: sort };
            const total = await Category.findOne({ slug: category_slug }).populate({ path: 'category_products', select: 'slug', match: search })
            const category = await Category.find({ slug: category_slug }).populate({ path: 'category_products', match: search, options: options, populate: { path: 'owner', select: 'username image -_id' } });
            products = category.map(e => e.toJSONpagination(options, page, total.category_products.length))[0];
        } else {
            options = { ...options, sort: sort, populate: { path: 'owner', select: 'username image -_id' } };
            products = await Product.paginate(search, options);
        }//if category

        if (req.auth) {
            const user_auth = await User.findOne({ id: req.auth.id });
            products.docs = products.docs.map(p => p.toLikeJSON(user_auth));
        }//if auth

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }//end trycath
}//getall_products

async function getall_products_popular(req, res) {
    try {
        const { offset, limit } = req.query;
        const products = await Product.find().sort({ "likes": -1 }).limit(limit).populate({ path: 'owner', select: 'username image -_id' });
        if (req.auth) {
            const user_auth = await User.findOne({ id: req.auth.id });
            products.map(p => p.toLikeJSON(user_auth));
        }
        res.json(products);
    } catch (error) {
        res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }//end trycath
}//getall_products

async function getone_product(req, res) {
    try {
        const slug = req.params.slug
        const product = await Product.findOne({ slug: slug }).populate({ path: 'owner', select: 'username image -_id' });
        if (!product) {
            res.status(404).json(FormatError("Product not found", res.statusCode));
        } else {
            if (req.auth) {
                const user_auth = await User.findOne({ id: req.auth.id });
                res.json(product.toLikeJSON(user_auth));
            } else {
                res.json(product);
            }
        };
    } catch (error) {
        if (error.kind === 'ObjectId') { res.status(404).json(FormatError("Product not found", res.statusCode)); }
        else { res.status(500).json(FormatError("An error has ocurred", res.statusCode)); }
    }
};//getone_product

async function like(req, res) {
    try {
        const slug = req.params.slug;
        const user = await User.findOne({ id: req.auth.id });
        const product = await Product.findOne({ slug: slug });
        if (user && product) {
            user.like(product);
            res.json(FormatSuccess('Like done correctly'));
        } else {
            res.status(404).json(FormatError("Product not found", res.statusCode));
        }
    } catch (error) {
        res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }
}//like

async function unlike(req, res) {
    try {
        const slug = req.params.slug;
        const user = await User.findOne({ id: req.auth.id });
        const product = await Product.findOne({ slug: slug });
        if (user && product) {
            user.unlike(product);
            res.json(FormatSuccess('Unlike done correctly'));
        } else {
            res.status(404).json(FormatError("Product not found", res.statusCode));
        }
    } catch (error) {
        res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }
}//unlike

async function get_likes(req, res) {
    try {
        const user = await User.findOne({ id: req.auth.id }).populate({ path: 'likes', populate: { path: 'owner', select: 'username image -_id' } });
        const user_toLike = await User.findOne({ id: req.auth.id });
        if (user) {
            res.json(user.likes.map(m => m.toLikeJSON(user_toLike)));
        } else {
            res.status(404).json(FormatError("User not found", res.statusCode))
        }
    } catch (error) {
        console.error(error);
        res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }
}//get_likes

async function get_user_products(req, res) {
    try {
        const user = await User.findOne({ id: req.auth.id });
        if (user) {
            const products = await Product.find({ owner: user._id }).populate({ path: 'owner', select: 'username image -_id' });
            res.json(products.map(m => m.toLikeJSON(user)));
        } else {
            res.status(404).json(FormatError("User not found", res.statusCode))
        }
    } catch (error) {
        console.error(error);
        res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }
}//get_user_products

const product_controller = {
    getall_products: getall_products,
    getone_product: getone_product,
    getall_products_popular: getall_products_popular,
    like: like,
    unlike: unlike,
    get_likes: get_likes,
    get_user_products: get_user_products
}

module.exports = product_controller