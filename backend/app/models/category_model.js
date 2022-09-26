const mongoose = require('mongoose');
const slug = require('slug');
const uniqueValidator = require('mongoose-unique-validator');



const category_shcema = new mongoose.Schema({
    slug: { type: String, lowercase: true, unique: true },
    category_name: String,
    category_picture: String
});

category_shcema.plugin(uniqueValidator, { msg: "already taken" });

category_shcema.pre('validate', function (next) {
    if (!this.slug) {
        this.slugify();
    }

    next();
});//pre

category_shcema.methods.slugify = function () {
    this.slug = slug(this.category_name) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};//slugify

mongoose.model('Category', category_shcema);