const mongoose = require('mongoose');
const slug = require('slug');
const uniqueValidator = require('mongoose-unique-validator');


const product_shcema = new mongoose.Schema({
    slug: { type: String, lowercase: true, unique: true },
    name: String,
    price: Number,
    description: String,
    owner: String,
    category: String,
    picture: [String]
});

product_shcema.plugin(uniqueValidator, { msg: "already taken" });

product_shcema.pre('validate', function (next) {
    if (!this.slug) {
        this.slugify();
    }
    next();
});//pre

product_shcema.methods.slugify = function () {
    this.slug = slug(this.name) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};//slugify

mongoose.model('Product', product_shcema);