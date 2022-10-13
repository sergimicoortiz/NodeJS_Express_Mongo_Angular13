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
            default: 'default image'
        },
        hash: String,
        salt: String
        //favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
        //following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        //followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    }
);//UserSchema

UserSchema.plugin(uniqueValidator, { message: "is already taken" });

UserSchema.methods.validPassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.addUser = function (username, email, image, password) {
    this.username = username;
    this.email = email;
    this.image = image;
    this.id = uuidv4();
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
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

UserSchema.methods.toAuthJSON = function () {
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT(),
        image: this.image
    };
};//toAuthJSON

mongoose.model('User', UserSchema);