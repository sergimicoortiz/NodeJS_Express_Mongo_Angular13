const mongoose = require('mongoose');
const Product = mongoose.model('Product');
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

        if (category_slug) {
            options = { limit: options.limit, skip: options.offset, sort: sort };
            const total = await Category.findOne({ slug: category_slug }).populate({ path: 'category_products', select: 'slug', match: search })
            const category = await Category.find({ slug: category_slug }).populate({ path: 'category_products', match: search, options: options });
            res.json(category.map(e => e.toJSONpagination(options, page, total.category_products.length))[0]);
        } else {
            options = { ...options, sort: sort };
            const products = await Product.paginate(search, options);
            res.json(products);
        }//end else if
    } catch (error) {
        res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }//end trycath
}//getall_products

async function getall_products_popular(req, res) {
    try {
        const { offset, limit } = req.query;
        const products = await Product.find().sort({ "likes": -1 }).limit(limit);
        res.json(products);
    } catch (error) {
        res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }//end trycath
}//getall_products

async function getone_product(req, res) {
    try {
        const id = req.params.id
        const product = await Product.findOne({ slug: id });
        if (!product) {
            res.status(404).json(FormatError("Product not found", res.statusCode));
        } else {
            res.json(product);
        };
    } catch (error) {
        if (error.kind === 'ObjectId') { res.status(404).json(FormatError("Product not found", res.statusCode)); }
        else { res.status(500).json(FormatError("An error has ocurred", res.statusCode)); }
    }
};//getone_product

async function create_product(req, res) {
    try {
        const product_data = {
            name: req.body.name || null,
            price: req.body.price || 0,
            description: req.body.description || null,
            owner: req.body.owner || null,
            //category: req.body.category || null,
            picture: req.body.picture || [null],
            date: new Date(),
            likes: 0,
            comments: [],
        };
        const product = new Product(product_data);
        const category = await Category.findOneAndUpdate({ slug: req.body.category },
            {
                $push: {
                    category_products: product._id
                }
            });
        product.category = category.category_name;
        const new_product = await product.save();
        res.json(new_product);
    } catch (error) {
        res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }//end try cath
}//create_product

async function delete_product(req, res) {
    try {
        const id = req.params.id
        const product = await Product.findOneAndDelete({ slug: id });
        if (!product) { res.status(404).json(FormatError("Product not found", res.statusCode)); } else {
            res.json(FormatSuccess("Product deleted"));
        }
    } catch (error) {
        if (error.kind === 'ObjectId') { res.status(404).json(FormatError("Product not found", res.statusCode)); }
        else { res.status(500).json(FormatError("An error has ocurred", res.statusCode)); }
    }//end try catch
}//delete_product

async function update_product(req, res) {
    try {
        const id = req.params.id
        const old_product = await Product.findOne({ slug: id });

        if (old_product.name !== req.body.name && req.body.name !== undefined) {
            old_product.slug = null;
        }//end if
        old_product.name = req.body.name || old_product.name;
        old_product.price = req.body.price || old_product.price;
        old_product.description = req.body.description || old_product.description;
        old_product.owner = req.body.owner || old_product.owner;
        old_product.picture = req.body.picture || old_product.picture;
        const update = await old_product.save();

        if (!update) { res.status(404).json(FormatError("Product not found", res.statusCode)); } else {
            res.json({ msg: "Product updated" })
        }
    } catch (error) {
        if (error.kind === 'ObjectId') { res.status(404).json(FormatError("Product not found", res.statusCode)); }
        else { res.status(500).json(FormatError("An error has ocurred", res.statusCode)); }
    }
}//update_product

async function deleteAll_product(req, res) {
    try {
        const deleteALL = await Product.collection.drop();
        res.json(FormatSuccess("Colection products deleted"));
    } catch (error) {
        if (error.code === 26) { res.status(404).json(FormatError("Product colection not exist", res.statusCode)); }
        else { res.status(500).json(FormatError("An error has ocurred", res.statusCode)); }
    }
}//deleteAll_product

const product_controller = {
    getall_products: getall_products,
    getone_product: getone_product,
    create_product: create_product,
    delete_product: delete_product,
    update_product: update_product,
    deleteAll_product: deleteAll_product,
    getall_products_popular: getall_products_popular
}

module.exports = product_controller