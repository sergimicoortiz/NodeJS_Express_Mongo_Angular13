const mongoose = require('mongoose');
const slug = require('slug');
const uniqueValidator = require('mongoose-unique-validator');
const category_schema = new mongoose.Schema({
    slug: { type: String, lowercase: true, unique: true },
    category_name: { type: String, lowercase: true },
    category_picture: String,
    category_products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

category_schema.plugin(uniqueValidator, { msg: "already taken" });

category_schema.pre('validate', function (next) {
    if (!this.slug) {
        this.slugify();
    }

    next();
});//pre

category_schema.methods.slugify = function () {
    this.slug = slug(this.category_name) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};//slugify

category_schema.methods.toJSONcarusel = function () {
    return {
        slug: this.slug,
        category_picture: this.category_picture
    }
}//toJSONcarusel

category_schema.methods.toJSONfilters = function () {
    return {
        slug: this.slug,
        category_name: this.category_name
    }
}//toJSONfilters

category_schema.methods.toJSONpagination = function (options, page, total) {
    return {
        docs: this.category_products,
        totalDocs: total,
        offset: options.skip,
        limit: options.limit,
        totalPages: Math.ceil(total / options.limit),
        page: page

    }
}//toJSONpagination

mongoose.model('Category', category_schema);