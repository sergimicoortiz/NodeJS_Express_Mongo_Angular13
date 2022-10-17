const mongoose = require('mongoose');
const slug = require('slug');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');

const product_schema = new mongoose.Schema({
    slug: { type: String, lowercase: true, unique: true },
    name: { type: String, lowercase: true },
    price: { type: Number, default: 0 },
    description: { type: String, maxLength: 400 },
    owner: String,
    category: String,
    picture: [String],
    date: { type: Date, default: Date.now() },
    likes: { type: Number, default: 0 },
});

product_schema.plugin(uniqueValidator, { msg: "already taken" });
product_schema.plugin(mongoosePaginate);

product_schema.pre('validate', function (next) {
    if (!this.slug) {
        this.slugify();
    }
    next();
});//pre

product_schema.methods.slugify = function () {
    this.slug = slug(this.name) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};//slugify

product_schema.methods.addLike = function () {
    this.likes = this.likes + 1;
    this.save();
}//addLike

product_schema.methods.removeLike = function () {
    if (this.likes > 0) { this.likes = this.likes - 1; }
    this.save();
}//removeLike

/* product_schema.methods.toLikeJSON = function (user) {
    return {
        slug: this.slug,
        name: this.name,
        price: this.price,
        description: this.description,
        owner: this.owner,
        category: this.category,
        picture: this.picture,
        date: this.date,
        likes: this.likes,
    };
}//toLikeJSON */

mongoose.model('Product', product_schema);