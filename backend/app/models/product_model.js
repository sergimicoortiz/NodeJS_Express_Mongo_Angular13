const mongoose = require('mongoose');
const slug = require('slug');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');


const product_shcema = new mongoose.Schema({
    slug: { type: String, lowercase: true, unique: true },
    name: String,
    price: Number,
    description: String,
    owner: String,
    picture: [String],
    date: String,
    likes: Number,
    comments: [{
        owner: String,
        msg: String,
        date: String,
        likes: Number
    }]
});

product_shcema.plugin(uniqueValidator, { msg: "already taken" });
product_shcema.plugin(mongoosePaginate);

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