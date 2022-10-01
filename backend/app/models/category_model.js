const mongoose = require('mongoose');
const slug = require('slug');
const uniqueValidator = require('mongoose-unique-validator');
//const mongoosePaginate = require('mongoose-paginate-v2');



const category_shcema = new mongoose.Schema({
    slug: { type: String, lowercase: true, unique: true },
    category_name: String,
    category_picture: String,
    category_products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

category_shcema.plugin(uniqueValidator, { msg: "already taken" });
//category_shcema.plugin(mongoosePaginate);


category_shcema.pre('validate', function (next) {
    if (!this.slug) {
        this.slugify();
    }

    next();
});//pre

category_shcema.methods.slugify = function () {
    this.slug = slug(this.category_name) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};//slugify

category_shcema.methods.toJSONcarusel = function () {
    return {
        slug: this.slug,
        category_picture: this.category_picture
    }
}//toJSONcarusel

category_shcema.methods.toJSONpagination = function (options, page, total) {
    return {
        docs: this.category_products,
        totalDocs: total,
        offset: options.skip,
        limit: options.limit,
        totalPages: Math.ceil(total / options.limit),
        page: page

    }
}//toJSONpagination

mongoose.model('Category', category_shcema);