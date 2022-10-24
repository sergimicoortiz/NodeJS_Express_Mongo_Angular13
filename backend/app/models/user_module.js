const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const secret = require('../config').secret;

const UserSchema = mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            //unique: true
        },
        image: {
            type: String,
            default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg'
        },
        hash: String,
        salt: String,
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
        following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        followers: {
            type: Number,
            default: 0
        },
    }
);//UserSchema

UserSchema.plugin(uniqueValidator, { message: "is already taken" });

UserSchema.methods.validPassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generatePassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};//generatePassword

UserSchema.methods.addUser = function (username, email, image, password) {
    this.username = username;
    this.email = email;
    this.image = image;
    this.id = uuidv4();
    this.generatePassword(password);
    return this.save();
}//addUser

UserSchema.methods.generateJWT = function () {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this.id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, secret);
};

UserSchema.methods.like = function (product) {
    if (this.likes.indexOf(product._id) === -1) {
        this.likes.push(product._id);
        product.addLike();
    }
    return this.save();
};

UserSchema.methods.unlike = function (product) {
    this.likes.remove(product._id);
    product.removeLike();
    return this.save();
};


//Start follow functions
UserSchema.methods.follow = function (id) {
    if (this.following.indexOf(id) === -1) {
        this.following.push(id);
        this.followers = this.followers + 1;
    }
    return this.save();
};

UserSchema.methods.unfollow = function (id) {
    this.following.remove(id);
    this.followers = this.followers - 1;
    return this.save();
};

UserSchema.methods.isFollowing = function (id) {
    return this.following.some(sid => sid.toString() === id.toString())
}

UserSchema.methods.toAuthJSON = function () {
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT(),
        image: this.image
    };
};//toAuthJSON

UserSchema.methods.toProfileJSON = function (user) {
    return {
        username: this.username,
        email: this.email,
        image: this.image,
        following: user ? user.isFollowing(this._id) : false
    };
}//toProfileJSON

UserSchema.methods.toProfileCommentJSON = function () {
    return {
        username: this.username,
        image: this.image
    };
}//toProfileCommentJSON

mongoose.model('User', UserSchema);